import { forwardRef, Module } from '@nestjs/common';
import { RestaurantsModule } from 'src/restaurants/restaurants.module';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { DateScalar } from '../common/scalars';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';

@Module({
  imports: [forwardRef(() => RestaurantsModule)],
  providers: [RecipesResolver, RecipesService, DateScalar, RestaurantsService],
})
export class RecipesModule { }
