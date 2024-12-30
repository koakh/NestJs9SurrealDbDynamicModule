import * as DataLoader from 'dataloader';
import { DataloaderProvider } from '@koakh/nestjs-dataloader';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { RestaurantsService } from '../../restaurants/restaurants.service';
import { Restaurant } from '../..//restaurants/entities';

@DataloaderProvider()
export class RestaurantDataLoader {
  constructor(private readonly restaurantsService: RestaurantsService) { }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  createDataloader(_ctx: GqlExecutionContext) {
    return new DataLoader<string, Type<Restaurant>>(async (ids: string[]) => {
      const query = `SELECT * FROM [${ids.join(',')}];`;
      return this.restaurantsService.rawQuery(query);
    });
  }
}
