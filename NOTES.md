# NOTES

- NestJS 9 SurrealDb dynamic moduled using 'old way' with `@golevelup/nestjs-modules`
based on [301 Moved Permanently](https://github.com/koakh/NestJsPlayWithDynamicModulesWithAppAndAppLib.git)

some other projects and files that help

- `/home/mario/Development/@Koakh/node-modules/@koakh/@NestJsPackages/TypescriptNestJsPackageJwtAuthenticationLdap/nestjs-package-jwt-authentication-ldap-consumer/src/consumer-app/consumer-app.module.ts`


AFTER SOM MANY HOURS the start solving is using `@Global` on `SurrealDbModule`

- `packages/app-lib/src/surrealdb/surrealdb.module.ts`

```ts
// required @Global() to override errors of 
// ERROR [ExceptionHandler] Nest can't resolve dependencies of the DbService (?). Please make sure that the argument SurrealDbService at index [0] is available in the DbModule context.
@Global()
@Module({
  providers: [
    SurrealDbService,
    ...createNestSurrealDbModuleProviders,
```