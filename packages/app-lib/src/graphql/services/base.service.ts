import { Injectable, Type } from '@nestjs/common';
import { SurrealDbService } from '../../surrealdb/surrealdb.service';
import { BaseCreateEntityInput, BaseUpdateEntityInput } from '../dto';
import { BaseFindAllArgs } from '../dto/base-find-all.args';
import { BaseEntity } from '../entities';
import { Fill, MapQueryResult, PreparedQuery, Prettify, RecordId } from 'surrealdb';

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
    const id = data?.id ? data.id : this.entityName.name.toLowerCase();
    return (await this.surrealDb.create<T, U>(id, {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    })) as unknown as T;
  }

  /**
   * find many entities
   * @param filter, skip, take
   * @returns array of entity object
   */
  async findMany<T extends unknown[]>({ filter, skip, take }: K): Promise<T[]> {
    const where = filter ? ` WHERE ${filter} ` : '';
    const limit = take != undefined ? ` LIMIT ${take}` : '';
    const start = skip != undefined ? ` START ${skip}` : '';
    const query = `SELECT * FROM type::table($table)${where}${limit}${start};`;
    // TODO: use vars with LIMIT and START
    // const query = 'SELECT * FROM type::table($table) LIMIT $limit START $start';
    const vars = { table: this.entityName.name.toLowerCase(), start: skip, limit: take };
    const data = await this.surrealDb.query<T>(query, vars);
    // TODO:
    return (data[0] as any).result;
  }

  /**
   * find one entity
   * @param id entity id
   * @returns array of entity object
   */
  async findOne(id: string): Promise<T[]> {
    const data = await this.surrealDb.select(id);
    // should not get here if we pass above validation
    if (data && Array.isArray(data) && data.length > 1) {
      throw new Error('found more than one record');
    }
    return data && Array.isArray(data) && data.length === 1 ? (data[0] as unknown as T[]) : [];
  }

  /**
   * update entity
   * @param id entity id
   * @param data payload
   * @returns updated object
   */
  async update<T extends { [x: string]: unknown; id: RecordId<string> }, U extends T>(id: string, data: Z): Promise<T> {
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
