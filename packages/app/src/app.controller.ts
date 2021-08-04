import { Controller, Get, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from 'app-lib';
import { AuthModuleOptions, AuthUser as User } from 'app-lib';
import { Body } from '@nestjs/common';
import { AddUserDto, IncrementUserDto } from './dto';
import { Post } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly authService: AuthService,
  ) { }

  // local appService call
  @Get()
  getHello(): { message: string } {
    return { message: this.appService.getHello() };
  }

  // use app-lib
  @Post('adduser')
  addUser(@Body() { username }: AddUserDto): { username: string, tokenVersion: number } {
    return this.authService.addUser(username, 1);
  }

  // use app-lib
  @Post('increment')
  addToken(@Body() { username }: IncrementUserDto): { username: string, tokenVersion: number } {
    return this.authService.incrementTokenVersion(username);
  }

  // use passed config from consumerApp
  @Get('config')
  config(): AuthModuleOptions {
    return this.authService.getConfig();
  }

  // use app-lib > calling appService
  @Get('appservice')
  getHelloAppModule(): { message: string } {
    // Logger.log(JSON.stringify(this.authService));
    return this.authService.getHelloAppModule();
  }

  // use app-lib > calling userService
  @Get('userservice')
  async userFindOneByField(): Promise<User> {
    return await this.authService.userFindOneByField();
  }
}
