import { forwardRef, Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars';
import { RestaurantsModule } from '../restaurants/restaurants.module';
import { RestaurantsService } from '../restaurants/restaurants.service';
import { RestaurantDataLoader } from './dataloader';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';

@Module({
  imports: [forwardRef(() => RestaurantsModule)],
  providers: [DateScalar, RestaurantDataLoader, RecipesResolver, RecipesService, RestaurantsService],
})
export class RecipesModule { }
