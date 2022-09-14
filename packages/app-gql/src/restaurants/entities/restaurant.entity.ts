import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Recipe } from 'src/recipes/entities';

@ObjectType()
export class Restaurant {
  @Field(() => ID)
  id: string;

  @Field()
  @Directive('@upper')
  uuid: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  email: string;

  @Field(() => Date)
  creationDate: Date;

  @Field(() => [Recipe], { nullable: true })
  recipes: Recipe[];
}
