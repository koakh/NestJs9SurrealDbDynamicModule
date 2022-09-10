import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'recipe ' })
export class Recipe {
  @Field(type => ID)
  id: string;

  @Directive('@upper')
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  // creationDate: Date;
  creationDate: string;

  @Field(type => [String])
  ingredients: string[];
}
