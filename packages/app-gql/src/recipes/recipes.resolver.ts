import { Args, Mutation, Parent, ResolveField, Resolver } from '@nestjs/graphql';
import { RestaurantsService } from 'src/restaurants/restaurants.service';
import { BaseResolver } from '../common/resolvers';
import { CreateRecipeInput } from './dto/create-recipe.input';
import { UpdateRecipeInput } from './dto/update-recipe.input';
import { Recipe } from './entities/recipe.entity';
import { RecipesService } from './recipes.service';

@Resolver(() => Recipe)
export class RecipesResolver extends BaseResolver(Recipe) {
  constructor(private readonly recipesService: RecipesService, private readonly restaurantsService: RestaurantsService) {
    super(recipesService);
  }

  @Mutation(() => Recipe)
  async createRecipe(@Args('createRecipeInput') createRecipeInput: CreateRecipeInput) {
    const recipe = await this.recipesService.create(createRecipeInput);
    this.pubSub.publish('recipeAdded', { recipeAdded: recipe });
    return recipe;
  }

  @Mutation(() => Recipe)
  async updateRecipe(@Args('id') id: string, @Args('updateRecipeInput') updateRecipeInput: UpdateRecipeInput) {
    const recipe = await this.recipesService.update(id, updateRecipeInput);
    this.pubSub.publish('recipeUpdated', { recipeAdded: recipe });
    return recipe;
  }

  @ResolveField()
  async restaurant(@Parent() recipe: Recipe) {
    const { restaurant } = recipe;
    // hack must cast it to string, because Recipe.restaurant is a id string, not a Restaurant object
    return this.restaurantsService.findOne(restaurant as unknown as string);
  }
}
