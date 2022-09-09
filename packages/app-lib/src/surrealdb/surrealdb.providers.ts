import { APP_SERVICE, SURREALDB_MODULE_OPTIONS, SURREALDB_MODULE_USER_SERVICE } from './surrealdb.constants';
import { SurrealDbModuleOptions } from './surrealdb.interfaces';

export const createNestSurrealDbModuleProviders = [
  // TODO: this is required, seems that only passed services are required here 
  // userService and appService
  {
    inject: [SURREALDB_MODULE_OPTIONS],
    provide: SURREALDB_MODULE_USER_SERVICE,
    useFactory: async (SurrealDbModuleOptions: SurrealDbModuleOptions) => {
      return SurrealDbModuleOptions.userService;
    },
  },
  // TODO: seems that this is not required
  // {
  //   inject: [SURREALDB_MODULE_OPTIONS],
  //   provide: SURREALDB_MODULE_OPTIONS,
  //   useFactory: async (SurrealDbModuleOptions: SurrealDbModuleOptions) => {
  //     return SurrealDbModuleOptions;
  //   },
  // }
];
