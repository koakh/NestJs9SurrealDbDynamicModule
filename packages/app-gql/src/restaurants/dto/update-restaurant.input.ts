import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';
import { CreateRestaurantInput } from './create-restaurant.input';

@InputType()
export class UpdateRestaurantInput extends PartialType(CreateRestaurantInput) {
  @Field()
  @MaxLength(30)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(255)
  description?: string;

  // TODO:
  // @Field(() => [Recipe])
  // recipes: Recipe[];
}
