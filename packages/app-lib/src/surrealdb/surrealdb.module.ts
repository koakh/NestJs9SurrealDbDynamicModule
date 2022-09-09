import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';
import { Global, Module } from '@nestjs/common';
import { SURREALDB_MODULE_OPTIONS } from './surrealdb.constants';
import { SurrealDbModuleOptions } from './surrealdb.interfaces';
import { createNestSurrealDbModuleProviders } from './surrealdb.providers';
import { SurrealDbService } from './surrealdb.service';

@Global()
@Module({
  providers: [
    SurrealDbService,
    ...createNestSurrealDbModuleProviders,
  ],
  exports: [
    SurrealDbService,
    ...createNestSurrealDbModuleProviders
  ],
})
export class SurrealDbModule extends createConfigurableDynamicRootModule<
  SurrealDbModule,
  SurrealDbModuleOptions
>(SURREALDB_MODULE_OPTIONS, {
  // TODO: remove: use packages/app-lib/src/surrealdb/surrealdb.providers.ts
  // providers: [
  //   {
  //     inject: [SURREALDB_MODULE_OPTIONS],
  //     provide: APP_SERVICE,
  //     useFactory: (options: SurrealDbModuleOptions) => options,
  //   },
  //   {
  //     inject: [SURREALDB_MODULE_OPTIONS],
  //     provide: SURREALDB_MODULE_OPTIONS,
  //     useFactory: (options: SurrealDbModuleOptions) => options,
  //   },
  //   {
  //     inject: [SURREALDB_MODULE_OPTIONS],
  //     provide: SURREALDB_MODULE_USER_SERVICE,
  //     useFactory: (options: SurrealDbModuleOptions) => options.userService,
  //   },
  // ],
}) {
}