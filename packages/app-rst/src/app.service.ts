import { Injectable } from '@nestjs/common';
import { AppServiceAbstract } from '@koakh/nestjs-surrealdb';

@Injectable()
// must implement AppServiceAbstract to fulfill injected test service
export class AppService extends AppServiceAbstract {
  getHello(): string {
    return 'Hello World from AppModule::AppService!';
  }
}
