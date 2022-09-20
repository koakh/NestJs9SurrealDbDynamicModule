import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { BaseResolver } from '../common/resolvers';
import { RecipesService } from '../recipes/recipes.service';
import { CreateRestaurantInput, UpdateRestaurantInput } from './dto';
import { Restaurant } from './entities/restaurant.entity';
import { RestaurantsService } from './restaurants.service';

const pubSub = new PubSub();

@Resolver(() => Restaurant)
export class RestaurantsResolver extends BaseResolver(Restaurant) {
  constructor(private readonly restaurantsService: RestaurantsService, private readonly recipesService: RecipesService) {
    super(restaurantsService);
  }

  @Mutation(() => Restaurant)
  async createRestaurant(@Args('createRestaurantInput') createRestaurantInput: CreateRestaurantInput) {
    const restaurant = await this.restaurantsService.create(createRestaurantInput);
    pubSub.publish('restaurantAdded', { restaurantAdded: restaurant });
    return restaurant;
  }

  @Mutation(() => Restaurant)
  async updateRestaurant(@Args('id') id: string, @Args('updateRestaurantInput') updateRestaurantInput: UpdateRestaurantInput) {
    const restaurant = await this.restaurantsService.update(id, updateRestaurantInput);
    pubSub.publish('restaurantUpdated', { restaurantAdded: restaurant });
    return restaurant;
  }

  @ResolveField()
  async recipes(@Parent() restaurant: Restaurant) {
    const { id } = restaurant;
    return this.recipesService.findMany({
      filter: `restaurant=${id}`,
    });
  }

  // @Query(() => Restaurant, { name: 'findOneRestaurant' })
  // async findOne(@Args('id') id: string) {
  //   return this.restaurantsService.findOne(id);
  // }

  // @Query(() => [Restaurant], { name: 'findManyRestaurants' })
  // async findMany(@Args() args: BaseFindAllArgs) {
  //   return this.restaurantsService.findMany(args);
  // }

  // @Mutation(() => Boolean)
  // async removeRestaurant(@Args('id') id: string) {
  //   pubSub.publish('restaurantDeleted', { restaurantDeleted: id });
  //   return this.restaurantsService.remove(id);
  // }
}
