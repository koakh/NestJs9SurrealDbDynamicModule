import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';
import { Global, Module } from '@nestjs/common';
import { SURREALDB_MODULE_OPTIONS } from './surrealdb.constants';
import { SurrealDbModuleOptions } from './surrealdb.interfaces';
import { createNestSurrealDbModuleProviders } from './surrealdb.providers';
import { SurrealDbService } from './surrealdb.service';

// required @Global() to override errors of 
// ERROR [ExceptionHandler] Nest can't resolve dependencies of the DbService (?). Please make sure that the argument SurrealDbService at index [0] is available in the DbModule context.
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