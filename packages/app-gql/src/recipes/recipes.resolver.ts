import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { NewRecipeInput } from './dto/new-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { UpdateRecipeInput } from './dto/update-recipe.input';
import { Recipe } from './models/recipe.model';
import { RecipesService } from './recipes.service';

const pubSub = new PubSub();

@Resolver(of => Recipe)
export class RecipesResolver {
  constructor(private readonly recipesService: RecipesService) { }

  @Query(returns => [Recipe])
  async recipe(@Args('id') id: string): Promise<Recipe[]> {
    return this.recipesService.findOneById(id);
  }

  @Query(returns => [Recipe])
  recipes(@Args() recipesArgs: RecipesArgs): Promise<Recipe[]> {
    return this.recipesService.findAll(recipesArgs);
  }

  @Mutation(returns => Recipe)
  async addRecipe(
    @Args('newRecipeData') newRecipeData: NewRecipeInput,
  ): Promise<Recipe> {
    const recipe = await this.recipesService.create(newRecipeData);
    pubSub.publish('recipeAdded', { recipeAdded: recipe });
    return recipe;
  }

  @Mutation(returns => Recipe)
  async updateRecipe(
    @Args('id') id: string,
    @Args('updateRecipeData') updateRecipeData: UpdateRecipeInput,
  ): Promise<Recipe> {
    const recipe = await this.recipesService.update(id, updateRecipeData);
    pubSub.publish('recipeUpdated', { recipeAdded: recipe });
    return recipe;
  }

  @Mutation(returns => Boolean)
  async removeRecipe(@Args('id') id: string) {
    pubSub.publish('recipeDeleted', { recipeDeleted: id });
    return this.recipesService.remove(id);
  }

  @Subscription(returns => Recipe)
  recipeAdded() {
    return pubSub.asyncIterator('recipeAdded');
  }

  @Subscription(returns => Recipe)
  recipeUpdated() {
    return pubSub.asyncIterator('recipeUpdated');
  }

  @Subscription(returns => String)
  recipeDeleted() {
    return pubSub.asyncIterator('recipeDeleted');
  }

}
