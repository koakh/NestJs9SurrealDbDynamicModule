import { Inject, Injectable } from "@nestjs/common";
import { AppServiceAbstract, UserServiceAbstract } from "./surrealdb.abstracts";
import { adminCurrentUser, APP_SERVICE, SURREALDB_MODULE_OPTIONS, SURREALDB_MODULE_USER_SERVICE } from './surrealdb.constants';
import { SurrealDbModuleOptions } from './surrealdb.interfaces';
import { SurrealDbStore } from "./surrealdb.store";
import { SurrealDbUser as User } from './types';

@Injectable()
export class SurrealDbService {

  private surrealdbStore: SurrealDbStore;

  constructor(
    @Inject(APP_SERVICE)
    private readonly appService: AppServiceAbstract,
    @Inject(SURREALDB_MODULE_OPTIONS)
    private readonly SurrealDbModuleOptions: SurrealDbModuleOptions,
    @Inject(SURREALDB_MODULE_USER_SERVICE)
    private readonly userService: UserServiceAbstract,
  ) {
    this.surrealdbStore = new SurrealDbStore();
  }

  addUser(username: string, tokenVersion: number): { username: string, tokenVersion: number } {
    this.surrealdbStore.addUser(username, tokenVersion);
    return { username, tokenVersion: this.surrealdbStore.getTokenVersion(username) };
  }

  incrementTokenVersion(username: string): { username: string, tokenVersion: number } {
    return { username, tokenVersion: this.surrealdbStore.incrementTokenVersion(username) };
  }

  getConfig(): SurrealDbModuleOptions {
    return this.SurrealDbModuleOptions;
  }

  // this is from consumer app AppModule/AppService
  getHelloAppModule(): { message: string } {
    return { message: `${this.appService.getHello()} (called in SurrealDbService.etHelloAppModule())` };
  }

  // this is from consumer app AppModule/UserService
  getUserFindOneByField(): Promise<User> {
    return this.userService.findOneByField('username', 'admin', adminCurrentUser);
  }
}
