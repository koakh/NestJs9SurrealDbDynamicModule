import { ArgsType, Field } from '@nestjs/graphql';
import { PaginationArgs } from './pagination.args';

@ArgsType()
export class BaseFindAllArgs extends PaginationArgs {
  @Field(() => String, { nullable: true })
  filter?: string;
}
