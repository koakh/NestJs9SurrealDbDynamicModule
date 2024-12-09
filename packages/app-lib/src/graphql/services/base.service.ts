import { Injectable, Type } from '@nestjs/common';
import { Fill, MapQueryResult, PreparedQuery, Prettify, RecordId } from 'surrealdb';
import { SurrealDbService, } from '../../surrealdb/surrealdb.service';
import { BaseCreateEntityInput, BaseUpdateEntityInput } from '../dto';
import { BaseFindAllArgs } from '../dto/base-find-all.args';
import { BaseEntity } from '../entities';

@Injectable()
export abstract class BaseService<T extends Type<BaseEntity>, K extends BaseFindAllArgs, V extends BaseCreateEntityInput, Z extends BaseUpdateEntityInput> {
  protected surrealDb: SurrealDbService;
  protected entityName: T;

  constructor(surrealDb: SurrealDbService) {
    this.surrealDb = surrealDb;
  }

  /**
   * create entity
   * @param data payload
   * @returns created entity
   */
  async create<T extends { [x: string]: unknown; id: RecordId<string>; }, U extends T>(data: V): Promise<T> {
    // await this.surrealDb.thingExists(data.restaurant);
    // const id = data?.id ? await this.surrealDb.recordIdFromStringThing(data.id as string) : this.entityName.name.toLowerCase();
    const id = data?.id ? await this.surrealDb.recordIdFromStringThing(data.id as string) : this.entityName.name.toLowerCase();
    const result = await this.surrealDb.create<T, U>(id, {...data, id: undefined});
    // if passed id `table` return array, if pass id `table:id` returns object must cast both to T
    return result[0] ? result[0] as unknown as T : result as unknown as T;
  }

  /**
   * find many entities
   * @param filter, skip, take
   * @returns array of entity object
   */
  async findMany<T extends unknown[]>({ filter, skip, take }: K): Promise<T[]> {
    const where = filter ? ` WHERE ${filter} ` : '';
    const limit = take != undefined ? ` LIMIT $take` : '';
    const start = skip != undefined ? ` START $skip` : '';
    const query = `SELECT * FROM type::table($table)${where}${limit}${start};`;
    const vars = { table: this.entityName.name.toLowerCase(), skip, take };
    const data = await this.surrealDb.query<T>(query, vars);
    return (data[0] as any);
  }

  /**
   * find one entity
   * @param id entity id
   * @returns array of entity object
   */
  async findOne(id: string): Promise<T> {
    const data = await this.surrealDb.select(id);
    // should not get here if we pass above validation
    if (data && Array.isArray(data) && data.length > 1) {
      throw new Error('found more than one record');
    }
    // return data && Array.isArray(data) && data.length === 1 ? (data[0] as unknown as T[]) : [];
    // Logger.log(`data: [${JSON.stringify((data as unknown as T[]), undefined, 2)}]`, BaseService.name);
    // TODO: when doesn't found anything still responds with `{ "errors": [ {} ], "data": null }`
    return data as unknown as T;
  }

  /**
   * update entity
   * @param id entity id
   * @param data payload
   * @returns updated object
   */
  async update<T extends { [x: string]: unknown; id: RecordId<string> }, U extends T>(id: string, data: any): Promise<T> {
    return (await this.surrealDb.update<T, U>(id, data)) as any as T;
  }

  /**
   * remove entity
   * @param id entity id
   * @returns true or false
   */
  async remove(id: string): Promise<boolean> {
    await this.surrealDb.delete(id);
    return true;
  }

  /**
   * raw query
   * @param sql
   */
  async queryRaw<T extends unknown[]>(...params: [prepared: PreparedQuery, gaps?: Fill<unknown>[]]): Promise<Prettify<MapQueryResult<T>>> {
    return await this.surrealDb.queryRaw<T>(...params);
  }
}
