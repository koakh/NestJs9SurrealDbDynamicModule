import { SurrealDbService } from '@koakh/nestjs-surrealdb';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  // constructor(
  //   // TODO: if enabled stops at
  //   // [InstanceLoader] GraphQLModule dependencies initialized +0ms
  //   // DON't enable else stop in bootstrap app?????
  //   private readonly surrealDbService: SurrealDbService,
  // ) { }
  //
  // async getSelect(thing: string): Promise<any> {
  //   return this.surrealDbService.select(thing);
  // }
}
