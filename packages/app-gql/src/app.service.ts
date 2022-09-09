import { SurrealDbService } from '@koakh/nestjs-surrealdb';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private readonly surrealDbService: SurrealDbService) { }

  async getSelect(thing: string): Promise<any> {
    return this.surrealDbService.select(thing);
  }
}
