import { Type } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { BaseCreateEntityInput, BaseFindAllArgs, BaseUpdateEntityInput } from '../dto';
import { BaseEntity } from '../entities';
import { BaseService } from '../services';

// an explicit return type (any above) is required: otherwise TypeScript complains about the usage of a private class definition.
// recommended: define an interface instead of using any.
export function BaseResolver<T extends Type<BaseEntity>, K extends BaseCreateEntityInput, V extends BaseUpdateEntityInput>(classRef: T, CreateClassRefInput: Type<K>, UpdateClassRefInput: Type<V>): any {
  // the isAbstract: true property indicates that SDL (Schema Definition Language statements)
  // shouldn't be generated for this class. Note, you can set this property for other types as well to suppress SDL generation.
  @Resolver({ isAbstract: true })
  abstract class BaseResolverHost {
    protected pubSub = new PubSub();

    constructor(private readonly serviceRef: BaseService<Type<BaseEntity>, BaseFindAllArgs, BaseCreateEntityInput, BaseUpdateEntityInput>) { }

    @Mutation(() => classRef, { name: `create${classRef.name}` })
    async createEntity(@Args(`create${classRef.name}Input`, { type: () => CreateClassRefInput }) createClassRefInput: K) {
      const entity = await this.serviceRef.create(createClassRefInput);
      this.pubSub.publish(`${classRef.name.toLowerCase()}Added`, { [`${classRef.name.toLowerCase()}Added`]: entity });
      return entity;
    }

    @Mutation(() => classRef, { name: `update${classRef.name}` })
    async updateEntity(@Args('id') id: string, @Args(`update${classRef.name}Input`, { type: () => UpdateClassRefInput }) updateClassRefInput: K) {
      const entity = await this.serviceRef.update(id, updateClassRefInput);
      this.pubSub.publish(`${classRef.name.toLowerCase()}Updated`, { [`${classRef.name.toLowerCase()}Updated`]: entity });
      return entity;
    }

    @Query(() => classRef, { name: `findOne${classRef.name}` })
    async findOne(@Args('id') id: string) {
      return this.serviceRef.findOne(id);
    }

    @Query(() => [classRef], { name: `findMany${classRef.name}s` })
    // only work with any and not T[]
    async findMany(@Args() args: BaseFindAllArgs): Promise<any[]> {
      return this.serviceRef.findMany(args);
    }

    @Mutation(() => Boolean, { name: `remove${classRef.name}` })
    async removeEntity(@Args('id') id: string) {
      this.pubSub.publish(`${classRef.name.toLowerCase()}Deleted`, { [`${classRef.name.toLowerCase()}Deleted`]: id });
      return this.serviceRef.remove(id);
    }

    @Subscription(() => classRef, { name: `${classRef.name.toLowerCase()}Added` })
    entityAdded() {
      return this.pubSub.asyncIterator(`${classRef.name.toLowerCase()}Added`);
    }

    @Subscription(() => classRef, { name: `${classRef.name.toLowerCase()}Updated` })
    entityUpdated() {
      return this.pubSub.asyncIterator(`${classRef.name.toLowerCase()}Updated`);
    }

    @Subscription(() => String, { name: `${classRef.name.toLowerCase()}Deleted` })
    entityDeleted() {
      return this.pubSub.asyncIterator(`${classRef.name.toLowerCase()}Deleted`);
    }
  }

  return BaseResolverHost;
}
