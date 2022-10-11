import { BaseEntity } from '@koakh/nestjs-surrealdb';
import { Directive, Field, ObjectType } from '@nestjs/graphql';
import { Restaurant } from '../../restaurants/entities';

@ObjectType({ description: 'recipe ' })
export class Recipe extends BaseEntity {
  @Field()
  @Directive('@upper')
  uuid: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [String])
  ingredients: string[];

  @Field(() => Restaurant)
  restaurant: Restaurant;
}
