import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';
import { Module } from '@nestjs/common';
import { SURREALDB_MODULE_OPTIONS } from './surrealdb.constants';
import { SurrealDbModuleOptions } from './surrealdb.interfaces';
import { SurrealDbService } from './surrealdb.service';
import {createNestGraphqlSurrealDbModuleProviders} from './surrealdb.providers';

@Module({
  providers: [
    SurrealDbService,
    ...createNestGraphqlSurrealDbModuleProviders,
  ],
  exports: [
    SurrealDbService,
    ...createNestGraphqlSurrealDbModuleProviders
  ],
})
export class SurrealDbModule extends createConfigurableDynamicRootModule<
  SurrealDbModule,
  SurrealDbModuleOptions
>(SURREALDB_MODULE_OPTIONS) { }