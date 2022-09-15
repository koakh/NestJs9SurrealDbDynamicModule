import { Directive, Field, ID, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from '../../common/entities';
import { Recipe } from '../../recipes/entities';

@ObjectType()
export class Restaurant extends BaseEntity {
  @Field()
  @Directive('@upper')
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
