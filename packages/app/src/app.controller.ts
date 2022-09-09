import { SurrealDbModuleOptions, SurrealDbService, SurrealDbUser as User } from '@koakh/nestjs-surrealdb';
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    // TODO: put to work
    // private readonly appService: AppService,
    private readonly SurrealDbService: SurrealDbService,
  ) { }

  // local appService call
  // @Get()
  // getHello(): { message: string } {
  //   return { message: this.appService.getHello() };
  // }

  // use passed config from consumerApp
  // @Get('config')
  // getConfig(): SurrealDbModuleOptions {
  //   return this.SurrealDbService.getConfig();
  // }

  // use app-lib > calling appService
  // @Get('appservice')
  // getHelloAppModule(): { message: string } {
  //   // Logger.log(JSON.stringify(this.SurrealDbService));
  //   return this.SurrealDbService.getHelloAppModule();
  // }

  // use app-lib > calling userService
  @Get('userservice')
  async getUserFindOneByField(): Promise<User> {
    return this.SurrealDbService.getUserFindOneByField();
  }
}
