import { Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsResolver } from './restaurants.resolver';

@Module({
  providers: [RestaurantsResolver, RestaurantsService]
})
export class RestaurantsModule {}
