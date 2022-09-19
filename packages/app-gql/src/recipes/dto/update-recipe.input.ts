import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';
import { BaseUpdateEntityInput } from '../../common/dto/base-update-entity.input';

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
