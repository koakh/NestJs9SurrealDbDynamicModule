import { APP_SERVICE, SURREALDB_MODULE_OPTIONS, SURREALDB_MODULE_USER_SERVICE } from './surrealdb.constants';
import { SurrealDbModuleOptions } from './surrealdb.interfaces';

export const createNestSurrealDbModuleProviders = [
  {
    inject: [SURREALDB_MODULE_OPTIONS],
    provide: SURREALDB_MODULE_USER_SERVICE,
    useFactory: async (SurrealDbModuleOptions: SurrealDbModuleOptions) => {
      return SurrealDbModuleOptions.userService;
    },
  },
  {
    inject: [SURREALDB_MODULE_OPTIONS],
    provide: SURREALDB_MODULE_OPTIONS,
    useFactory: async (SurrealDbModuleOptions: SurrealDbModuleOptions) => {
      return SurrealDbModuleOptions;
    },
  }
];
