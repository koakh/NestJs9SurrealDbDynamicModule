import { SurrealDbService } from '@koakh/nestjs-surrealdb';
import { Injectable, Type } from '@nestjs/common';
import { BaseFindAllArgs } from '../common/dto/base-find-all.args';
import { BaseService } from '../common/services';
import { UpdateRecipeInput } from './dto';
import { CreateRecipeInput } from './dto/create-recipe.input';
import { Recipe } from './entities';

@Injectable()
export class RecipesService extends BaseService<Type<Recipe>, BaseFindAllArgs, CreateRecipeInput, UpdateRecipeInput> {
  constructor(protected readonly surrealDb: SurrealDbService) {
    super();
    this.entityName = Recipe;
  }
}
