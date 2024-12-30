import { BaseEntity } from '@koakh/nestjs-surrealdb';
import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { Recipe } from '../../recipes/entities';

@ObjectType()
export class Restaurant extends BaseEntity {
  @Field()
  @Directive('@lower')
  uuid: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field({ nullable: true })
  email: string;

  @Field(() => [Recipe], { nullable: true })
  recipes?: Recipe[];
}
