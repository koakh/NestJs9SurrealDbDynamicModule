# NOTES

dynamic modules poc project, used in marathon of learn how to use nestjs dynamic modules with custom providers and standalone projects

notes for app and app-lib

UPDATE: 2022-09-08 19:39:08 this is the more recente package that have `AuthModule.forRootAsync` with injected `configService: ConfigService, userService: UserService` from `app.module`

```ts
AuthModule.forRootAsync(AuthModule, {
  useFactory: async (configService: ConfigService, userService: UserService) => ({
    secret: configService.get('accessTokenJwtSecret'),
    expiresIn: configService.get('accessTokenExpiresIn'),
    userService,
  }),
```

## Start Development Environment

```shell
$ lerna bootstrap
# term#1
$ npm run pkg:app-lib:dev
# term#2
$ npm run pkg:app:debug
```

## Test Consumer App and Package

```shell
$ curl localhost:3000 | jq
{
  "message": "Hello World from AppModule::AppService!"
}

$ curl -X POST localhost:3000/adduser -d '{ "username" : "mario" }' -H 'Content-Type: application/json' | jq
{
  "username": "mario",
  "tokenVersion": 1
}

$ curl -X POST localhost:3000/increment -d '{ "username" : "mario" }' -H 'Content-Type: application/json' | jq
{
  "username": "mario",
  "tokenVersion": 9
}

$ curl localhost:3000/config | jq
{
  "secret": "90dcfcd8-d3bd-4af0-a8a3-f3e03181a83f",
  "expiresIn": "120s"
}

$ curl localhost:3000/appservice | jq
{
  "message": "Hello World from AppModule::AppService!"
}

$ curl localhost:3000/userservice | jq
{
  "message": "Hello World from AppModule::AppService!"
}
```
