import { Module } from '@nestjs/common';
import { DateScalar } from '../common/scalars/date.scalar';
import { RecipesResolver } from './recipes.resolver';
import { RecipesService } from './recipes.service';

@Module({
  imports: [
    // don't bring here global SurrealDbModule again
    // SurrealDbModule,
  ],
  providers: [RecipesResolver, RecipesService, DateScalar],
})
export class RecipesModule { }
