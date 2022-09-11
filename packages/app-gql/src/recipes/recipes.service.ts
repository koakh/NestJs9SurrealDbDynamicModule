import { SurrealDbService } from '@koakh/nestjs-surrealdb';
import { Injectable } from '@nestjs/common';
import { UpdateRecipeInput } from './dto';
import { NewRecipeInput } from './dto/new-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { Recipe } from './models';

@Injectable()
export class RecipesService {
  constructor(private readonly surrealDb: SurrealDbService) {}

  async create(data: NewRecipeInput): Promise<Recipe> {
    return (await this.surrealDb.create(Recipe.name.toLowerCase(), {
      ...data,
      creationDate: new Date(),
    })) as Recipe;
  }

  async update(id: string, data: UpdateRecipeInput): Promise<Recipe> {
    return (await this.surrealDb.change(id, data)) as any as Recipe;
  }

  async findOneById(id: string): Promise<Recipe[] | null> {
    const data = await this.surrealDb.select(id);
    // should not get here if we pass above validation
    if (data && Array.isArray(data) && data.length > 1) {
      throw new Error('found more ');
    }
    return data as unknown as Recipe[];
  }

  async findAll({ skip, take }: RecipesArgs): Promise<Recipe[]> {
    // TODO: add surrealDb helper method with this sql in constants
    // const query = 'SELECT * FROM type::table($table) START $start LIMIT $limit';
    const query = 'SELECT * FROM type::table($table) LIMIT 3 START 0';
    const vars = { table: Recipe.name.toLowerCase(), start: skip, limit: take };
    const data = await this.surrealDb.query(query, vars);
    return data[0].result;
  }

  async remove(id: string): Promise<boolean> {
    await this.surrealDb.delete(id);
    return true;
  }
}
