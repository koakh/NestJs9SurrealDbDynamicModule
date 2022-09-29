import { Type } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { DataloaderProvider } from '@tracworx/nestjs-dataloader';
import * as DataLoader from 'dataloader';
import { Recipe } from '../../recipes/entities';
import { RecipesService } from '../../recipes/recipes.service';

@DataloaderProvider()
export class RecipeDataLoader {
  constructor(private readonly recipeService: RecipesService) { }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createDataloader(_ctx: GqlExecutionContext) {
    return new DataLoader<string, Promise<Type<Recipe>[]>>(async (ids: string[]) => {
      const arrayOfPromises = ids.map((e: string) => {
        return this.recipeService.rawQuery(`SELECT * FROM recipe WHERE restaurant = ${e}`);
      });
      return arrayOfPromises;
    });
  }
}
