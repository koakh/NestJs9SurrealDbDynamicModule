import { createConfigurableDynamicRootModule } from '@golevelup/nestjs-modules';
import { Module } from '@nestjs/common';
import { AUTH_MODULE_OPTIONS } from './surrealdb.constants';
import { AuthModuleOptions } from './surrealdb.interfaces';
import { AuthService } from './surrealdb.service';
import {createNestGraphqlAuthModuleProviders} from './auth.providers';

@Module({
  providers: [
    AuthService,
    ...createNestGraphqlAuthModuleProviders,
  ],
  exports: [
    AuthService,
    ...createNestGraphqlAuthModuleProviders
  ],
})
export class AuthModule extends createConfigurableDynamicRootModule<
  AuthModule,
  AuthModuleOptions
>(AUTH_MODULE_OPTIONS) { }