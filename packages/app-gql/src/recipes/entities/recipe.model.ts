import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Restaurant } from '../../restaurants/entities';

@ObjectType({ description: 'recipe ' })
export class Recipe {
  @Field(() => ID)
  id: string;

  @Field()
  @Directive('@upper')
  uuid: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Date)
  creationDate: Date;

  @Field(() => [String])
  ingredients: string[];

  @Field(() => Restaurant)
  restaurant: Restaurant;
}
