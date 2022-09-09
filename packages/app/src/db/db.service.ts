import { SurrealDbService, SurrealDbUser as User } from '@koakh/nestjs-surrealdb';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DbService {
  constructor(
    // TODO: to use this use @Global on AppModule
    // @Inject(APP_SERVICE)
    // private readonly appService: AppService,
    private readonly surrealDbService: SurrealDbService,
  ) { }

  async getUserFindOneByField(): Promise<User> {
    return this.surrealDbService.getUserFindOneByField();
  }
}
