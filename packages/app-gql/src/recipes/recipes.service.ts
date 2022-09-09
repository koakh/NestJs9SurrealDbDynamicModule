import { SurrealDbService } from '@koakh/nestjs-surrealdb';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NewRecipeInput } from './dto/new-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { Recipe } from './models/recipe.model';

@Injectable()
export class RecipesService {
  constructor(
    private readonly db: SurrealDbService,
    private readonly configService: ConfigService,
  ) {
    Logger.log(this.configService.get('SURREALDB_URL'), RecipesService.name);
  }

  async create(data: NewRecipeInput): Promise<Recipe> {
    const thing = await this.db.select('person:uv1o55sjes0tdpa31ool');
    Logger.log(JSON.stringify(thing, undefined, 2), RecipesService.name);
    return {
      ...data,
      id: new Date().getTime().toString(),
      creationDate: new Date(),
    } as Recipe;
  }

  async findOneById(id: string): Promise<Recipe> {
    return {} as any;
  }

  async findAll(recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return [] as Recipe[];
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
