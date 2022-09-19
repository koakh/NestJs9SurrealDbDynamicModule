import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { BaseFindAllArgs } from '../common/dto/base-find-all.args';
import { RecipesService } from '../recipes/recipes.service';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsService } from './restaurants.service';

const pubSub = new PubSub();

@Resolver(() => Restaurant)
// export class RestaurantsResolver
export class RestaurantsResolver /*extends BaseResolver(Restaurant, RepositoryService<Restaurant>)*/ {
  constructor(private readonly restaurantsService: RestaurantsService, private readonly recipesService: RecipesService) {
    /*super();*/
  }

  @Mutation(() => Restaurant)
  async createRestaurant(@Args('createRestaurantInput') createRestaurantInput: CreateRestaurantInput) {
    const restaurant = await this.restaurantsService.create(createRestaurantInput);
    pubSub.publish('restaurantAdded', { restaurantAdded: restaurant });
    return restaurant;
  }

  @Query(() => Restaurant, { name: 'restaurant' })
  async findOne(@Args('id') id: string) {
    return this.restaurantsService.findOne(id);
  }

  @Query(() => [Restaurant], { name: 'restaurants' })
  async findMany(@Args() args: BaseFindAllArgs) {
    return this.restaurantsService.findMany(args);
  }

  @Mutation(() => Restaurant)
  async updateRestaurant(@Args('id') id: string, @Args('updateRestaurantInput') updateRestaurantInput: UpdateRestaurantInput) {
    const restaurant = await this.restaurantsService.update(id, updateRestaurantInput);
    pubSub.publish('restaurantUpdated', { restaurantAdded: restaurant });
    return restaurant;
  }

  @Mutation(() => Boolean)
  async removeRestaurant(@Args('id') id: string) {
    pubSub.publish('restaurantDeleted', { restaurantDeleted: id });
    return this.restaurantsService.remove(id);
  }

  @ResolveField()
  async recipes(@Parent() restaurant: Restaurant) {
    const { id } = restaurant;
    return this.recipesService.findMany({
      filter: `restaurant=${id}`,
    });
  }
}
