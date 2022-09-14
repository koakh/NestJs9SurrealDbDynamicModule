import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Max, Min } from 'class-validator';

// TODO: baseClass
@ArgsType()
export class RestaurantsArgs {
  @Field(() => String, { nullable: true })
  filter?;

  @Field(() => Int)
  @Min(0)
  skip? = 0;

  @Field(() => Int)
  @Min(1)
  @Max(50)
  take? = 25;
}
