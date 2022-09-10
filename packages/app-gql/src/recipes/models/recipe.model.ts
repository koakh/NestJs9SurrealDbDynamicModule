import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'recipe ' })
export class Recipe {
  @Field(() => ID)
  id: string;

  @Directive('@upper')
  title: string;

  @Field({ nullable: true })
  description?: string;

  // @Field()
  @Field(() => Date)
  creationDate: Date;

  @Field(() => [String])
  ingredients: string[];
}
