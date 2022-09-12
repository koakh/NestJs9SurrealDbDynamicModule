import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class CreateRestaurantInput {
  @Field({ description: 'Example field (placeholder)' })
  @MaxLength(36)
  guid: string;

  @Field()
  @MaxLength(30)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(30, 255)
  description?: string;

  // TODO: how to add recipes here
  // @Field(() => [Recipe])
  // recipes: Recipe[];
}
