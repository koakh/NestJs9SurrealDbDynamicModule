import { SurrealDbService } from '@koakh/nestjs-surrealdb';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DbService {
  constructor(
    private readonly surrealDbService: SurrealDbService,
  ) { }
}
