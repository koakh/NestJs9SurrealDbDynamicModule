import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

@ArgsType()
export class PaginationArgs {
  @Field(() => Int, { defaultValue: 0 })
  @Min(0)
  skip?: number = 0;

  @Field(() => Int, { defaultValue: 25 })
  @Min(1)
  @Max(50)
  take?: number = 25;
}
