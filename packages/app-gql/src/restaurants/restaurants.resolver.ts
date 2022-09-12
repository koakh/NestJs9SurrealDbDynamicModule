import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RestaurantsService } from './restaurants.service';
import { Restaurant } from './entities/restaurant.entity';
import { CreateRestaurantInput } from './dto/create-restaurant.input';
import { UpdateRestaurantInput } from './dto/update-restaurant.input';
import { RestaurantsArgs } from './dto';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver(() => Restaurant)
export class RestaurantsResolver {
  constructor(private readonly restaurantsService: RestaurantsService) { }

  @Mutation(() => Restaurant)
  async createRestaurant(
    @Args('createRestaurantInput') createRestaurantInput: CreateRestaurantInput,
  ) {
    const restaurant = await this.restaurantsService.create(createRestaurantInput);
    pubSub.publish('restaurantAdded', { restaurantAdded: restaurant });
    return restaurant;
  }

  @Query(() => Restaurant, { name: 'restaurant' })
  async findOne(@Args('id') id: string) {
    return this.restaurantsService.findOne(id);
  }

  @Query(() => [Restaurant], { name: 'restaurants' })
  async findAll(@Args() restaurantsArgs: RestaurantsArgs) {
    return this.restaurantsService.findAll(restaurantsArgs);
  }

  @Mutation(() => Restaurant)
  async updateRestaurant(
    @Args('id') id: string,
    @Args('updateRestaurantInput') updateRestaurantInput: UpdateRestaurantInput,
  ) {
    const restaurant = await this.restaurantsService.update(id, updateRestaurantInput);
    pubSub.publish('restaurantUpdated', { restaurantAdded: restaurant });
    return restaurant;
  }

  @Mutation(() => Boolean)
  async removeRestaurant(@Args('id') id: string) {
    pubSub.publish('restaurantDeleted', { restaurantDeleted: id });
    return this.restaurantsService.remove(id);
  }
}
