import { Loader } from '@koakh/nestjs-dataloader';
import { BaseResolver } from '@koakh/nestjs-surrealdb';
import { Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { RecipesService } from '../recipes/recipes.service';
import { RecipeDataLoader } from './dataloader';
import { CreateRestaurantInput, UpdateRestaurantInput } from './dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsService } from './restaurants.service';

@Resolver(() => Restaurant)
export class RestaurantsResolver extends BaseResolver(Restaurant, CreateRestaurantInput, UpdateRestaurantInput) {
  // we omit implicit <Type<Restaurant>, CreateRestaurantInput>, and let TS infer it :)
  constructor(private readonly restaurantsService: RestaurantsService, private readonly recipesService: RecipesService) {
    super(restaurantsService);
  }

  // both with and without resolveFields use same queries, keep with dataLoader for a future example of how to do it

  // resolveField with dataLoader
  @ResolveField()
  async recipes(@Parent() restaurant: Restaurant, @Loader(RecipeDataLoader) recipeDataLoader) {
    const { id } = restaurant;
    // batch query using dataloader, optional cast to string
    return recipeDataLoader.load(id as unknown as string);
  }

  // // resolveField without dataLoader
  // @ResolveField()
  // async recipes(@Parent() restaurant: Restaurant) {
  //   const { id } = restaurant;
  //   return this.recipesService.findMany({
  //     filter: `restaurant=${id}`,
  //   });
  // }
}
