import { APP_SERVICE, SurrealDbModuleOptions, SurrealDbService, SurrealDbUser as User } from '@koakh/nestjs-surrealdb';
import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    // this is required else can't find dependency, is defined with TOKEN SYMBOL
    @Inject(APP_SERVICE)
    private readonly appService: AppService,
    private readonly surrealDbService: SurrealDbService,
  ) { }

  // local appService call
  @Get()
  getHello(): { message: string } {
    return { message: this.appService.getHello() };
  }

  // use passed config from consumerApp
  @Get('config')
  getConfig(): SurrealDbModuleOptions {
    return this.surrealDbService.getConfig();
  }

  // use app-lib > calling appService
  @Get('appservice')
  getHelloAppModule(): { message: string } {
    // Logger.log(JSON.stringify(this.SurrealDbService));
    return this.surrealDbService.getHelloAppModule();
  }

  // use app-lib > calling userService
  @Get('userservice')
  async getUserFindOneByField(): Promise<User> {
    return this.surrealDbService.getUserFindOneByField();
  }
}
