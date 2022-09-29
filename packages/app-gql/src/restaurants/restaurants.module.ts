import { forwardRef, Module } from '@nestjs/common';
import { RestaurantsService } from './restaurants.service';
import { RestaurantsResolver } from './restaurants.resolver';
import { RecipesModule } from 'src/recipes/recipes.module';
import { RecipesService } from 'src/recipes/recipes.service';
import { RecipeDataLoader } from './dataloader';

@Module({
  imports: [forwardRef(() => RecipesModule)],
  providers: [RestaurantsResolver, RestaurantsService, RecipesService, RecipeDataLoader],
})
export class RestaurantsModule { }
