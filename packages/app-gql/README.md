# README

## Links

- [Documentation | NestJS - A progressive Node.js framework](https://docs.nestjs.com/graphql/quick-start)
- [nest/sample/23-graphql-code-first at master · nestjs/nest](https://github.com/nestjs/nest/tree/master/sample/23-graphql-code-first)

## Prerequisites

Please make sure that Node.js (version >= 12, except for v13) is installed on your operating system.

## Setup

Setting up a new project is quite simple with the Nest CLI. With npm installed, you can create a new Nest project with the following commands in your OS terminal:


```shell
$ npm i -g @nestjs/cli
```

## Create a new NestJs Project

```shell
$ nest new tutorial-graphql
? Which package manager would you ❤️  to use? 
  npm 
❯ yarn 
  pnpm
```

## Installing the required packages:

```shell
# For Express and Apollo (default)
$ yarn add @nestjs/graphql @nestjs/apollo @nestjs/config apollo-server-express graphql graphql-subscriptions graphql-query-complexity @koakh/nestjs-surrealdb
```

## CleanUp non used Files

```shell
# remove rest files
rm src/app.controller.spec.ts src/app.controller.ts src/app.service.ts
```

## Add .env File

`.env`

```bash
GRAPHQL_AUTO_SCHEMA_FILE='./schema.gql'
```
## Change AppModule

replace `src/app.module.ts` with

```ts
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        autoSchemaFile: join(
          process.cwd(),
          configService.get<string>('GRAPHQL_AUTO_SCHEMA_FILE'),
        ),
        installSubscriptionHandlers: true,
      }),
    }),
  ],
})
export class AppModule {}
```

## Code first


