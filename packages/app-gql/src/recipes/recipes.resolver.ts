import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { Loader } from '@koakh/nestjs-dataloader';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { RestaurantDataLoader } from './dataloader';
import { CreateRecipeInput } from './dto/create-recipe.input';
import { UpdateRecipeInput } from './dto/update-recipe.input';
import { Recipe } from './entities/recipe.entity';
import { RecipesService } from './recipes.service';
import { BaseResolver } from '@koakh/nestjs-surrealdb';

@Resolver(() => Recipe)
export class RecipesResolver extends BaseResolver(Recipe, CreateRecipeInput, UpdateRecipeInput) {
  // we omit implicit <Type<Recipe>, CreateRecipeInput>, and let TS infer it :)
  constructor(private readonly recipesService: RecipesService, private readonly restaurantsService: RestaurantsService) {
    super(recipesService);
  }

  @ResolveField()
  async restaurant(@Parent() recipe: Recipe, @Loader(RestaurantDataLoader) restaurantDataLoader) {
    const { restaurant } = recipe;
    // batch query using dataloader, optional cast to string
    return restaurantDataLoader.load(restaurant as unknown as string);
  }

  // resolveField without dataLoader
  // @ResolveField()
  // async restaurant(@Parent() recipe: Recipe) {
  //   const { restaurant } = recipe;
  //   // hack must cast it to string, because Recipe.restaurant is a id string, not a Restaurant object
  //   return this.restaurantsService.findOne(restaurant as unknown as string);
  // }
}
