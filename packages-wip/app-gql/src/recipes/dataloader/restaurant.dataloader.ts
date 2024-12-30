import { DataloaderProvider } from '@koakh/nestjs-dataloader';
import { PreparedQuery } from '@koakh/nestjs-surrealdb';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as DataLoader from 'dataloader';
import { Restaurant } from '../../restaurants/entities';
import { RestaurantsService } from '../../restaurants/restaurants.service';

@DataloaderProvider()
export class RestaurantDataLoader {
  constructor(private readonly restaurantsService: RestaurantsService) { }

  createDataloader(_ctx: GqlExecutionContext) {
    // TODO: hard to solve any type here
    // https://claude.ai/chat/61181c48-2a06-4236-a0b0-063f0e700a45
    return new DataLoader<string, Restaurant, string>(async (ids: any) => {
      const preparedQuery = new PreparedQuery(`SELECT * FROM restaurant WHERE id IN [${ids.join(',')}];`, {});
      const results = await this.restaurantsService.queryRaw<Restaurant[]>(preparedQuery);

      return ids.map(id => {
        const restaurant = results.find(r =>
          (r as unknown as { id: string }).id === id
        );
        return restaurant || new Error(`Restaurant ${id} not found`);
      });
    });
  }
}