import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'recipe ' })
export class Recipe {
  @Field(() => ID)
  id: string;

  @Field()
  @Directive('@upper')
  guid: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => Date)
  creationDate: Date;

  @Field(() => [String])
  ingredients: string[];
}
