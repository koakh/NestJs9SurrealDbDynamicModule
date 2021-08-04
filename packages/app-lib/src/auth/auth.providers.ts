import { AUTH_MODULE_OPTIONS, AUTH_MODULE_USER_SERVICE } from './auth.constants';
import { AuthModuleOptions } from './auth.interfaces';

export const createNestGraphqlAuthModuleProviders = [
  {
    provide: AUTH_MODULE_USER_SERVICE,
    useFactory: async (authModuleOptions: AuthModuleOptions) => {
      return authModuleOptions.userService;
    },
    inject: [AUTH_MODULE_OPTIONS],
  }
];
