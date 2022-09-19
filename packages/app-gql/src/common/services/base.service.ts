import { SurrealDbService } from '@koakh/nestjs-surrealdb';
import { Injectable, Type } from '@nestjs/common';
import { CreateRestaurantInput } from '../../restaurants/dto';
import { BaseFindAllArgs } from '../dto/base-find-all.args';
import { BaseUpdateEntityInput } from '../dto/base-update-entity.input';
import { BaseEntity } from '../entities';

// T EntityType ex Recipe
// K CreateEntityInput ex CreateRecipeInput
// V EntityArgs ex RecipesArgs
// Z UpdateEntityInput ex UpdateRecipeInput
@Injectable()
export abstract class BaseService<T extends Type<BaseEntity>, K extends CreateRestaurantInput, V extends BaseFindAllArgs, Z extends BaseUpdateEntityInput> {
  // constructor(protected readonly surrealDb: SurrealDbService, @Optional() classRef: T) {}
  // TODO: it will uses child service and works, there is no need to pass in constructor
  protected readonly surrealDb: SurrealDbService;
  protected symbol: T;

  // constructor(surrealDb: SurrealDbService, classRef: T) {}

  async create(data: K): Promise<T> {
    // await this.surrealDb.thingExists(data.restaurant);
    const id = data?.id ? data.id : this.symbol.name.toLowerCase();
    return (await this.surrealDb.create(id, {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    })) as T;
  }

  // // TODO: almost equal just use generics here or a base class
  // async findMany({ filter, skip, take }: V): Promise<T[]> {
  //   // TODO: add surrealDb helper method with this sql in constants
  //   const where = filter ? ` WHERE ${filter} ` : '';
  //   const limit = take != undefined ? ` LIMIT ${take}` : '';
  //   const start = skip != undefined ? ` START ${skip}` : '';
  //   const query = `SELECT * FROM type::table($table)${where}${limit}${start};`;
  //   // TODO: use vars with LIMIT and START
  //   // const query = 'SELECT * FROM type::table($table) LIMIT $limit START $start';
  //   const vars = { table: Recipe.name.toLowerCase(), start: skip, limit: take };
  //   const data = await this.surrealDb.query(query, vars);
  //   return data[0].result;
  // }

  // // TODO: almost equal just use generics here or a base class
  // async findOne(id: string): Promise<Recipe[]> {
  //   const data = await this.surrealDb.select(id);
  //   // should not get here if we pass above validation
  //   if (data && Array.isArray(data) && data.length > 1) {
  //     throw new Error('found more than one record');
  //   }
  //   return data && Array.isArray(data) && data.length === 1 ? (data[0] as unknown as Recipe[]) : [];
  // }

  // async update(id: string, data: UpdateRecipeInput): Promise<Recipe> {
  //   return (await this.surrealDb.change(id, data)) as any as Recipe;
  // }

  // async remove(id: string): Promise<boolean> {
  //   await this.surrealDb.delete(id);
  //   return true;
  // }
}
