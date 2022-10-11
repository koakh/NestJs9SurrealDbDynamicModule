import { BaseFindAllArgs } from '@koakh/nestjs-surrealdb';
import { BaseService } from '@koakh/nestjs-surrealdb';
import { SurrealDbService } from '@koakh/nestjs-surrealdb';
import { Injectable, Type } from '@nestjs/common';
import { UpdateRecipeInput } from './dto';
import { CreateRecipeInput } from './dto/create-recipe.input';
import { Recipe } from './entities';

@Injectable()
export class RecipesService extends BaseService<Type<Recipe>, BaseFindAllArgs, CreateRecipeInput, UpdateRecipeInput> {
  constructor(protected readonly surrealDb: SurrealDbService) {
    super(surrealDb);
    this.entityName = Recipe;
  }
}
