import { SurrealDbService } from '@koakh/nestjs-surrealdb';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NewRecipeInput } from './dto/new-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { Recipe } from './models';

@Injectable()
export class RecipesService {
  constructor(
    private readonly surrealDb: SurrealDbService,
    private readonly configService: ConfigService,
  ) {
    // TODO:
    // Logger.log(this.configService.get('SURREALDB_URL'), RecipesService.name);
  }

  async create(data: NewRecipeInput): Promise<Recipe> {
    return (await this.surrealDb.create(Recipe.name.toLowerCase(), {
      ...data,
      creationDate: new Date(),
    })) as Recipe;
  }

  // TODO: fails if don't pass id
  async findOneById(id: string): Promise<Recipe[] | null> {
    if (id.split(':').length === 1) {
      throw new Error('must pass entity:id');
    }

    const thing = await this.surrealDb.select(id);

    // // if (thing && Array.isArray(thing) && thing.length > 1) {
    // //   throw new Error('must pass entity:id');
    // // }
    return thing as unknown as Recipe[];
    // return (await this.db.select(id)) as unknown as Recipe;
  }

  async findAll(recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return [] as Recipe[];
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
