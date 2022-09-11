import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';

@Module({
  imports: [
    // don't bring here global SurrealDbModule again, surreal is imported in appModules forRoot and is @Global to
    // SurrealDbModule,
  ],
  providers: [RecipesResolver, RecipesService, DateScalar],
})
export class RecipesModule { }
