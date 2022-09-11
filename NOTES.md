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

## Problems

### Graphql Error Handling

- [GraphQL doesn&#39;t work well with `BaseExceptionFilter` · Issue #5958 · nestjs/nest](https://github.com/nestjs/nest/issues/5958)
  - more helpful
- [Documentation | NestJS - A progressive Node.js framework](https://docs.nestjs.com/graphql/other-features)
- [Error handling](https://www.apollographql.com/docs/apollo-server/data/errors/)
- [https://towardsdev.com/nestjs-graphql-things-you-should-know-about-before-starting-a-project-7178690b90e0](https://towardsdev.com/nestjs-graphql-things-you-should-know-about-before-starting-a-project-7178690b90e0)

the trick to work with gql and http errors at same time is in files

- `packages/app-gql/src/app.module.ts`
  to return minimal error message

```ts
if (err.message) {
  return new Error(err.message);
}
```

- `packages/app-gql/src/common/filters/all-exceptions.filter.ts`

```ts
if ((ctx as any).contextType === 'graphql') {
  throw exception;
}    
```

