import { BaseUpdateEntityInput } from '@koakh/nestjs-surrealdb';
import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';

@InputType()
export class UpdateRecipeInput extends BaseUpdateEntityInput {
  @Field()
  @MaxLength(30)
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(255)
  description?: string;

  @Field(() => [String])
  ingredients: string[];
}
