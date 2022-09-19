import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, MaxLength } from 'class-validator';
import { BaseUpdateEntityInput } from '../../common/dto/base-update-entity.input';

@InputType()
export class UpdateRestaurantInput extends BaseUpdateEntityInput {
  @Field()
  @MaxLength(30)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(255)
  description?: string;
}
