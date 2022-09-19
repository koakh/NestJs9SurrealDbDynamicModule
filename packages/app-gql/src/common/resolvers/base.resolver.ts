import { Type } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { RepositoryService } from '../abstract/repository.service';
import { BaseFindAllArgs } from '../dto/base-find-all.args';
import { BaseEntity } from '../entities';

// an explicit return type (any above) is required: otherwise TypeScript complains
// about the usage of a private class definition.
// Recommended: define an interface instead of using any.
export function BaseResolver<T extends Type<BaseEntity>, S extends RepositoryService<T>>(classRef: T, serviceRef: S): any {
  // The isAbstract: true property indicates that SDL (Schema Definition Language statements)
  // shouldn't be generated for this class. Note, you can set this property for other types as well to suppress SDL generation.
  @Resolver({ isAbstract: true })
  abstract class BaseResolverHost {
    @Query(() => [classRef], { name: `findAll${classRef.name}` })
    async findAll(@Args() args: BaseFindAllArgs): Promise<T[]> {
      // return [];
      return serviceRef.findMany(args);
    }
  }
  return BaseResolverHost;
}
