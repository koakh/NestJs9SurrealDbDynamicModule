import { ArgsType, Field } from '@nestjs/graphql';
import { PaginationArgs } from '../../common/dto';

@ArgsType()
export class RecipesArgs extends PaginationArgs {
  @Field(() => String, { nullable: true })
  filter?: string;
}
