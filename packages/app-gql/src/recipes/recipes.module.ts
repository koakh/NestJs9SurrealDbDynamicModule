import { forwardRef, Module } from '@nestjs/common';
import { RestaurantsModule } from '../restaurants/restaurants.module';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { DateScalar } from '../common/scalars';
import { RestaurantDataLoader } from './dataloader';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';

@Module({
  imports: [forwardRef(() => RestaurantsModule)],
  providers: [RecipesResolver, RecipesService, DateScalar, RestaurantsService, RestaurantDataLoader],
})
export class RecipesModule { }
