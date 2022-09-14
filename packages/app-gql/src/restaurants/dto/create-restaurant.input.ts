import { Field, InputType } from '@nestjs/graphql';
import {
  IsDefined,
  IsEmail,
  IsOptional,
  IsUUID,
  MaxLength,
} from 'class-validator';

@InputType()
export class CreateRestaurantInput {
  @IsOptional()
  @Field({
    description: 'Optional id, if omitted surrealdb generates one',
    nullable: true,
  })
  id: string;

  @IsUUID()
  @Field({ description: 'Example field (placeholder)' })
  uuid: string;

  @IsDefined()
  @MaxLength(30)
  @Field()
  name: string;

  @IsEmail()
  @Field({ nullable: true })
  email: string;

  @IsOptional()
  @MaxLength(255)
  @Field({ nullable: true })
  description?: string;

  // TODO: how to add recipes here
  // @Field(() => [Recipe])
  // recipes: Recipe[];
}
