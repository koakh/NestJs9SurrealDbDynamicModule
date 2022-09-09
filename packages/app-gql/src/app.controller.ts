import { Controller, Get, Param } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/:thing')
  select(@Param('thing') thing: string): any {
    return this.appService.getSelect(thing);
  }
}
