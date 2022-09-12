import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class CreateRecipeInput {
  @Field()
  @MaxLength(36)
  guid: string;

  @Field()
  @MaxLength(30)
  title: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(30, 255)
  description?: string;

  @Field(() => [String])
  ingredients: string[];
}
