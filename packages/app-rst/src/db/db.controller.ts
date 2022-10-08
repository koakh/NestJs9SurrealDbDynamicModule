import { SurrealDbService, SurrealDbUser as User } from '@koakh/nestjs-surrealdb';
import { Controller, Get, Param } from '@nestjs/common';

@Controller('db')
export class DbController {
  constructor(
    private readonly surrealDbService: SurrealDbService,
  ) { }

  // use app-lib > calling userService
  @Get('userservice')
  async getUserFindOneByField(): Promise<User> {
    return this.surrealDbService.getUserFindOneByField();
  }

  @Get('select/:thing')
  select(@Param('thing') thing: string): any {
    return this.surrealDbService.select(thing);
  }

}
