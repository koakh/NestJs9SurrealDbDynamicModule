import { SurrealDbService } from '@koakh/nestjs-surrealdb';
import { Injectable } from '@nestjs/common';
import { UpdateRecipeInput } from './dto';
import { CreateRecipeInput } from './dto/create-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { Recipe } from './entities';

@Injectable()
export class RecipesService {
  constructor(private readonly surrealDb: SurrealDbService) { }

  async create(data: CreateRecipeInput): Promise<Recipe> {
    await this.surrealDb.thingExists(data.restaurant);
    const id = data?.id ? data.id : Recipe.name.toLowerCase();
    return (await this.surrealDb.create(id, {
      ...data,
      creationDate: new Date(),
    })) as Recipe;
  }

  // TODO: almost equal just use generics here or a base class
  async findMany({ filter, skip, take }: RecipesArgs): Promise<Recipe[]> {
    // TODO: add surrealDb helper method with this sql in constants
    const where = filter ? ` WHERE ${filter} ` : '';
    const limit = take != undefined ? ` LIMIT ${take}` : '';
    const start = skip != undefined ? ` START ${skip}` : '';
    const query = `SELECT * FROM type::table($table)${where}${limit}${start};`;
    // TODO: use vars with LIMIT and START
    // const query = 'SELECT * FROM type::table($table) LIMIT $limit START $start';
    const vars = { table: Recipe.name.toLowerCase(), start: skip, limit: take };
    const data = await this.surrealDb.query(query, vars);
    return data[0].result;
  }

  // TODO: almost equal just use generics here or a base class
  async findOne(id: string): Promise<Recipe[]> {
    const data = await this.surrealDb.select(id);
    // should not get here if we pass above validation
    if (data && Array.isArray(data) && data.length > 1) {
      throw new Error('found more than one record');
    }
    return data && Array.isArray(data) && data.length === 1 ? (data[0] as unknown as Recipe[]) : [];
  }

  async update(id: string, data: UpdateRecipeInput): Promise<Recipe> {
    return (await this.surrealDb.change(id, data)) as any as Recipe;
  }

  async remove(id: string): Promise<boolean> {
    await this.surrealDb.delete(id);
    return true;
  }
}
