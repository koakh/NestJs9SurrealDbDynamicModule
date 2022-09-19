import { SurrealDbService } from '@koakh/nestjs-surrealdb';
import { Injectable, Type } from '@nestjs/common';
import { BaseFindAllArgs } from '../common/dto/base-find-all.args';
import { BaseService } from '../common/services';
import { CreateRestaurantInput, UpdateRestaurantInput } from './dto';
import { Restaurant } from './entities/restaurant.entity';

@Injectable()
export class RestaurantsService extends BaseService<Type<Restaurant>, BaseFindAllArgs, CreateRestaurantInput, UpdateRestaurantInput> {
  constructor(protected readonly surrealDb: SurrealDbService) {
    super();
    this.entityName = Restaurant;
  }
}
