import { BaseFindAllArgs, BaseService, SurrealDbService } from '@koakh/nestjs-surrealdb';
import { Injectable, Type } from '@nestjs/common';
import { CreateRestaurantInput, UpdateRestaurantInput } from './dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantsService extends BaseService<Type<Restaurant>, BaseFindAllArgs, CreateRestaurantInput, UpdateRestaurantInput> {
  constructor(protected readonly surrealDb: SurrealDbService) {
    super(surrealDb);
    this.entityName = Restaurant;
  }
}
