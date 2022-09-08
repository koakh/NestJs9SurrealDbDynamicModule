import { Injectable } from '@nestjs/common';
import { AppServiceAbstract } from 'app-lib';

@Injectable()
// must implement AppServiceAbstract to fulfill injected test service
export class AppService extends AppServiceAbstract {
  getHello(): string {
    return 'Hello World from AppModule::AppService!';
  }
}
