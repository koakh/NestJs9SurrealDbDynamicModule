import { BaseCreateEntityInput } from '@koakh/nestjs-surrealdb';
import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsOptional, IsUUID, MaxLength } from 'class-validator';

@InputType()
export class CreateRecipeInput extends BaseCreateEntityInput {
  @IsUUID()
  @Field({ description: 'Example field (placeholder)' })
  uuid: string;

  @IsDefined()
  @MaxLength(30)
  @Field()
  title: string;

  @IsOptional()
  @MaxLength(255)
  @Field({ nullable: true })
  description?: string;

  @Field(() => [String])
  ingredients: string[];

  @IsDefined()
  @Field(() => String)
  restaurant: string;
}
