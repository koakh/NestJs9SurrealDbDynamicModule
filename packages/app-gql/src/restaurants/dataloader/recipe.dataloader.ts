import { DataloaderProvider } from '@koakh/nestjs-dataloader';
import { PreparedQuery } from '@koakh/nestjs-surrealdb';
import { Type } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as DataLoader from 'dataloader';
import { Recipe } from '../../recipes/entities';
import { RecipesService } from '../../recipes/recipes.service';

@DataloaderProvider()
export class RecipeDataLoader {
  constructor(private readonly recipeService: RecipesService) { }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createDataloader(_ctx: GqlExecutionContext) {
    // TODO: was string[], hard to solve `any` type here
    // https://claude.ai/chat/61181c48-2a06-4236-a0b0-063f0e700a45
    return new DataLoader<string, Promise<Type<Recipe>[]>>(async (ids: any) => {
      const arrayOfPromises = ids.map((e: string) => {
        // return this.recipeService.rawQuery(`SELECT * FROM recipe WHERE restaurant = ${e}`);
        const preparedQuery = new PreparedQuery(`SELECT * FROM recipe WHERE restaurant = ${e}`, {});
        return this.recipeService.queryRaw(preparedQuery);
      });
      return arrayOfPromises;
    });
  }
}
