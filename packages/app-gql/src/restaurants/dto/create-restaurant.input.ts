import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsEmail, IsOptional, IsUUID, MaxLength } from 'class-validator';
import { BaseCreateEntityInput } from '../../common/dto/base-create-entity.input';

@InputType()
export class CreateRestaurantInput extends BaseCreateEntityInput {
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
