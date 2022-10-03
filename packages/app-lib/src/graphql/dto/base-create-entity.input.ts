import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class BaseCreateEntityInput {
  @IsOptional()
  @Field({
    description: 'Optional id, if omitted surrealdb generates one',
    nullable: true,
  })
  id: string;
}
