import { SurrealDbService, SurrealDbUser as User } from '@koakh/nestjs-surrealdb';
import { Controller, Get } from '@nestjs/common';

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

}
