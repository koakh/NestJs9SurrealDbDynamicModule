# README

README in [GitHub: NestJsPackageJwtAuthentication](https://github.com/koakh/NestJsPackageJwtAuthentication/blob/main/README.md)

## Create a test Application with NestJsPackageJwtAuthentication

```shell
# bootstrap a new nest test app
$ nest new test
$ cd test
# install deps
$ npm i @koakh/nestjs-package-jwt-authentication @nestjs/config
# edit AppModule
$ code src/app.module.ts
```

add `AuthModule` and `ConfigModule` from `@koakh/nestjs-package-jwt-authentication` and `@nestjs/config`

`src/app.module.ts`

```typescript
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from '@koakh/nestjs-package-jwt-authentication';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
```

add a `test/.env` file

```conf
ACCESS_TOKEN_JWT_SECRET=secretKeyAccessToken
ACCESS_TOKEN_EXPIRES_IN=15m
REFRESH_TOKEN_JWT_SECRET=secretKeyRefreshToken
REFRESH_TOKEN_EXPIRES_IN=7d
REFRESH_TOKEN_SKIP_INCREMENT_VERSION=false
```

## Test Endpoints

```shell
# clone client.http
wget https://raw.githubusercontent.com/koakh/NestJsPackageJwtAuthentication/main/client.http
```

> Note: required the awesome [REST Client](https://marketplace.visualstudio.com/items?itemName=humao.rest-client)

now test all requests

or test with a simple curl 

```shell
$ curl --request POST \
  --url http://localhost:3000/auth/login \
  --header 'content-type: application/json' \
  --header 'user-agent: vscode-restclient' \
  --data '{"username": "admin","password": "12345678"}' \
  | jq

{
  "user": {
    "id": "efeed3eb-c0a2-4b3e-816f-2a42ca8451b3",
    "username": "admin",
    "firstName": "Pietra",
    "lastName": "Heine",
    "email": "pheine0@illinois.edu",
    "roles": [
      "USER",
      "ADMIN"
    ],
    "createdDate": 1597444307,
    "metaData": {
      "key": "value"
    }
  },
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoiZWZlZWQzZWItYzBhMi00YjNlLTgxNmYtMmE0MmNhODQ1MWIzIiwicm9sZXMiOlsiVVNFUiIsIkFETUlOIl0sImlhdCI6MTYwMjI2MDk3NywiZXhwIjoxNjAyMjYxODc3fQ.-n6-xmrKIObquE10bKHnKRgzDvIFClkOQiVJMy8w0ew"
}
```

we are done