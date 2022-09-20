import { SurrealDbService } from '@koakh/nestjs-surrealdb';
import { Injectable, Type } from '@nestjs/common';
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

  async create(data: V): Promise<T> {
    // await this.surrealDb.thingExists(data.restaurant);
    const id = data?.id ? data.id : this.entityName.name.toLowerCase();
    return (await this.surrealDb.create(id, {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    })) as T;
  }

  async findMany({ filter, skip, take }: K): Promise<T[]> {
    const where = filter ? ` WHERE ${filter} ` : '';
    const limit = take != undefined ? ` LIMIT ${take}` : '';
    const start = skip != undefined ? ` START ${skip}` : '';
    const query = `SELECT * FROM type::table($table)${where}${limit}${start};`;
    // TODO: use vars with LIMIT and START
    // const query = 'SELECT * FROM type::table($table) LIMIT $limit START $start';
    const vars = { table: this.entityName.name.toLowerCase(), start: skip, limit: take };
    const data = await this.surrealDb.query(query, vars);
    return data[0].result;
  }

  async findOne(id: string): Promise<T[]> {
    const data = await this.surrealDb.select(id);
    // should not get here if we pass above validation
    if (data && Array.isArray(data) && data.length > 1) {
      throw new Error('found more than one record');
    }
    return data && Array.isArray(data) && data.length === 1 ? (data[0] as unknown as T[]) : [];
  }

  async update(id: string, data: Z): Promise<T> {
    return (await this.surrealDb.change(id, data)) as any as T;
  }

  async remove(id: string): Promise<boolean> {
    await this.surrealDb.delete(id);
    return true;
  }
}
