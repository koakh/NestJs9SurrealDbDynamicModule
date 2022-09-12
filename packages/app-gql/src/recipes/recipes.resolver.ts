import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { CreateRecipeInput } from './dto/create-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { UpdateRecipeInput } from './dto/update-recipe.input';
import { Recipe } from './entities/recipe.model';
import { RecipesService } from './recipes.service';

const pubSub = new PubSub();

@Resolver(() => Recipe)
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) { }

  @Mutation(() => Recipe)
  async createRecipe(@Args('createRecipeInput') createRecipeInput: CreateRecipeInput) {
    const recipe = await this.recipesService.create(createRecipeInput);
    pubSub.publish('recipeAdded', { recipeAdded: recipe });
    return recipe;
  }

  @Query(() => Recipe, { name: 'recipe' })
  async findOne(@Args('id') id: string) {
    return this.recipesService.findOne(id);
  }

  @Query(() => [Recipe], { name: 'recipes' })
  async findAll(@Args() recipesArgs: RecipesArgs) {
    return this.recipesService.findAll(recipesArgs);
  }

  @Mutation(() => Recipe)
  async updateRecipe(
    @Args('id') id: string,
    @Args('updateRecipeInput') updateRecipeInput: UpdateRecipeInput,
  ) {
    const recipe = await this.recipesService.update(id, updateRecipeInput);
    pubSub.publish('recipeUpdated', { recipeAdded: recipe });
    return recipe;
  }

  @Mutation(() => Boolean)
  async removeRecipe(@Args('id') id: string) {
    pubSub.publish('recipeDeleted', { recipeDeleted: id });
    return this.recipesService.remove(id);
  }

  @Subscription(() => Recipe)
  recipeAdded() {
    return pubSub.asyncIterator('recipeAdded');
  }

  @Subscription(() => Recipe)
  recipeUpdated() {
    return pubSub.asyncIterator('recipeUpdated');
  }

  @Subscription(() => String)
  recipeDeleted() {
    return pubSub.asyncIterator('recipeDeleted');
  }
}
