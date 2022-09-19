import { Type } from '@nestjs/common';
import { SurrealDbService } from '@koakh/nestjs-surrealdb';
import { Restaurant } from '../../restaurants/entities';
import { BaseFindAllArgs } from '../dto/base-find-all.args';
import { BaseEntity } from '../entities';

export abstract class RepositoryService<T extends Type<BaseEntity>> {
  constructor(protected readonly surrealDb: SurrealDbService) {}
  // abstract create(data: CreateRestaurantInput);
  // abstract findMany({ filter, skip, take }: BaseFindAllArgs): Promise<T[]>;
  // abstract findOne(id: string): Promise<Restaurant[]>;
  // abstract update(id: string, data: UpdateRestaurantInput): Promise<Restaurant>;
  // abstract remove(id: string): Promise<boolean>;

  // TODO: almost equal just use generics here or a base class
  async findMany({ filter, skip, take }: BaseFindAllArgs): Promise<T[]> {
    // TODO: add surrealDb helper method with this sql in constants
    const where = filter ? ` WHERE ${filter}` : '';
    const limit = take != undefined ? ` LIMIT ${take}` : '';
    const start = skip != undefined ? ` START ${skip}` : '';
    const query = `SELECT * FROM type::table($table)${where}${limit}${start};`;
    // TODO: use vars with LIMIT and START
    // const query = 'SELECT * FROM type::table($table) LIMIT $limit START $start';
    const vars = {
      table: Restaurant.name.toLowerCase(),
      start: skip,
      limit: take,
    };
    // must work with both, data[0].result[0] work with resolveField
    const data = await this.surrealDb.query(query, vars);
    return data[0].result;
  }
}
