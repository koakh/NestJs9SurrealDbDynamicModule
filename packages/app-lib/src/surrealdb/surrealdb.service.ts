import { Inject, Injectable } from "@nestjs/common";
import { AppServiceAbstract, UserServiceAbstract } from "./surrealdb.abstracts";
import { adminCurrentUser, APP_SERVICE, SURREALDB_MODULE_OPTIONS, SURREALDB_MODULE_USER_SERVICE } from './surrealdb.constants';
import { SurrealDbModuleOptions } from './surrealdb.interfaces';
import { SurrealDbUser as User } from './types';

@Injectable()
export class SurrealDbService {

  constructor(
    @Inject(APP_SERVICE)
    private readonly appService: AppServiceAbstract,
    @Inject(SURREALDB_MODULE_OPTIONS)
    private readonly SurrealDbModuleOptions: SurrealDbModuleOptions,
    @Inject(SURREALDB_MODULE_USER_SERVICE)
    private readonly userService: UserServiceAbstract,
  ) { }

  // SurrealDbModuleOptions
  getConfig(): SurrealDbModuleOptions {
    return this.SurrealDbModuleOptions;
  }

  // AppServiceAbstract: this is from consumer app AppModule/AppService
  getHelloAppModule(): { message: string } {
    return { message: `${this.appService.getHello()} (called in SurrealDbService.etHelloAppModule())` };
  }

  // UserServiceAbstract: this is from consumer app AppModule/UserService
  getUserFindOneByField(): Promise<User> {
    return this.userService.findOneByField('username', 'admin', adminCurrentUser);
  }
}
