import { SurrealDbService } from '@koakh/nestjs-surrealdb';
import { Injectable } from '@nestjs/common';
import {
  CreateRestaurantInput,
  RestaurantsArgs,
  UpdateRestaurantInput
} from './dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantsService {
  constructor(private readonly surrealDb: SurrealDbService) { }

  async create(data: CreateRestaurantInput) {
    const id = data?.id ? data.id : Restaurant.name.toLowerCase();
    return (await this.surrealDb.create(id, {
      ...data,
      creationDate: new Date(),
    })) as Restaurant;
  }

  // TODO: almost equal just use generics here or a base class
  async findMany({
    filter,
    skip,
    take,
  }: RestaurantsArgs): Promise<Restaurant[]> {
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

  // TODO: almost equal just use generics here or a base class
  async findOne(id: string): Promise<Restaurant[]> {
    const data = await this.surrealDb.select(id);
    // should not get here if we pass above validation
    if (data && Array.isArray(data) && data.length > 1) {
      throw new Error('found more than one record');
    }
    return data && Array.isArray(data) && data.length === 1
      ? (data[0] as unknown as Restaurant[])
      : [];
  }

  async update(id: string, data: UpdateRestaurantInput): Promise<Restaurant> {
    return (await this.surrealDb.change(id, data)) as any as Restaurant;
  }

  async remove(id: string): Promise<boolean> {
    await this.surrealDb.delete(id);
    return true;
  }
}
