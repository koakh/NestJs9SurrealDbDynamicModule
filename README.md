# README

- [README](#readme)
  - [Project Components](#project-components)
    - [NestJs SurrealDb Dynamic Module](#nestjs-surrealdb-dynamic-module)
    - [REST Consumer App](#rest-consumer-app)
    - [GraphQL Consumer App](#graphql-consumer-app)
    - [GraphQL DataLoader Package](#graphql-dataloader-package)
    - [GraphQL SurrealDb Tutorial](#graphql-surrealdb-tutorial)
  - [Test Package and Consumer Apps](#test-package-and-consumer-apps)
    - [Install and Run SurrealDb](#install-and-run-surrealdb)
      - [Install SurrealDb](#install-surrealdb)
        - [TLDR](#tldr)
          - [Install on macOS](#install-on-macos)
          - [Install on Linux](#install-on-linux)
          - [Install on Windows](#install-on-windows)
      - [Start SurrealDb Instance](#start-surrealdb-instance)
  - [Init surrealDb Database](#init-surrealdb-database)
  - [Now launch Consumer Apps](#now-launch-consumer-apps)
    - [Rest Consumer App](#rest-consumer-app-1)
    - [GraphQL Consumer App](#graphql-consumer-app-1)
    - [GraphQL Tutorial Consumer App](#graphql-tutorial-consumer-app)

## Project Components

### NestJs SurrealDb Dynamic Module

the main `@koakh/nestjs-surrealdb` nestjs dynamic module (library) locate at  `packages/app-lib`

this is just a simple wrapper on top of [surrealdb.js integration](https://surrealdb.com/docs/integration/libraries/nodejs),
check [github repo](https://github.com/surrealdb/surrealdb.js),
and don't forget to **star** the project, this "surreal team dreamers" deserve it

### REST Consumer App

rest consumer sample app `@koakh/nestjs-surrealdb-rest-demo` locate at `packages/app-rst`

### GraphQL Consumer App

graphql consumer sample app `@koakh/nestjs-surrealdb-graphql-demo` locate at `packages/app-rst`

### GraphQL DataLoader Package

cloned [tracworx/nestjs-dataloade](https://github.com/tracworx/nestjs-dataloade) to work with nestjs 9 without use `--force` flag

### GraphQL SurrealDb Tutorial

- [README](packages/tutorial-graphql/README.md)

## Test Package and Consumer Apps

### Install and Run SurrealDb

#### Install SurrealDb

first install SurrealDb. full instruction at [SurrealDB | Install](https://surrealdb.com/install)

##### TLDR

###### Install on macOS

```shell
$ brew install surrealdb/tap/surreal
```

###### Install on Linux

```shell
$ curl -sSf https://install.surrealdb.com | sh
```

###### Install on Windows

```shell
$ iwr https://windows.surrealdb.com -useb | iex
```

#### Start SurrealDb Instance

- [SurrealDB | Documentation](https://surrealdb.com/docs/start/starting-surrealdb)

```shell
# start with in memory
$ surreal start --user root --pass root

# or start with rocksdb (persisted on disk)
$ surreal start --user root --pass root file:mydb

# outcome
 .d8888b.                                             888 8888888b.  888888b.
d88P  Y88b                                            888 888  'Y88b 888  '88b
Y88b.                                                 888 888    888 888  .88P
 'Y888b.   888  888 888d888 888d888  .d88b.   8888b.  888 888    888 8888888K.
    'Y88b. 888  888 888P'   888P'   d8P  Y8b     '88b 888 888    888 888  'Y88b
      '888 888  888 888     888     88888888 .d888888 888 888    888 888    888
Y88b  d88P Y88b 888 888     888     Y8b.     888  888 888 888  .d88P 888   d88P
 'Y8888P'   'Y88888 888     888      'Y8888  'Y888888 888 8888888P'  8888888P'


[2022-09-05 23:05:47] INFO  surrealdb::iam Root authentication is enabled
[2022-09-05 23:05:47] INFO  surrealdb::iam Root username is 'root'
[2022-09-05 23:05:47] INFO  surrealdb::dbs Database strict mode is disabled
[2022-09-05 23:05:47] INFO  surrealdb::kvs Starting kvs store at file:mydb
[2022-09-05 23:05:47] INFO  surrealdb::kvs Started kvs store at file:mydb
[2022-09-05 23:05:47] INFO  surrealdb::net Starting web server on 0.0.0.0:8000
[2022-09-05 23:05:47] INFO  surrealdb::net Started web server on 0.0.0.0:8000
```

## Init surrealDb Database

import the `initdb.sql`

```shell
# import schemafull
$ surreal import initdb.sql --conn http://localhost:8000 --user root --pass root --ns test --db test
# outcome
[2022-09-05 23:07:01] INFO  surrealdb::cli The SQL file was imported successfully

# check info for db
$ echo "INFO FOR DB;" | surreal sql --conn http://localhost:8000 --user root --pass root --ns test --db test | jq
[
  {
    "time": "129.866µs",
    "status": "OK",
    "result": {
      "dl": {},
      "dt": {},
      "sc": {
        "allusers": "DEFINE SCOPE allusers SESSION 2w SIGNUP (CREATE user SET settings.marketing = $marketing, email = $email, pass = crypto::argon2::generate($pass), tags = $tags) SIGNIN (SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(pass, $pass))"
      },
      "tb": {
        "person": "DEFINE TABLE person SCHEMALESS",
        "user": "DEFINE TABLE user SCHEMAFULL PERMISSIONS FOR select WHERE id = $auth.id, FOR create NONE, FOR update WHERE id = $auth.id, FOR delete NONE"
      }
    }
  }
]

# check info for user
$ echo "INFO FOR TABLE user;" | surreal sql --conn http://localhost:8000 --user root --pass root --ns test --db test | jq
[
  {
    "time": "112.283µs",
    "status": "OK",
    "result": {
      "ev": {},
      "fd": {
        "email": "DEFINE FIELD email ON user TYPE string",
        "pass": "DEFINE FIELD pass ON user TYPE string",
        "settings.marketing": "DEFINE FIELD settings.marketing ON user TYPE string",
        "settings[*]": "DEFINE FIELD settings[*] ON user TYPE object",
        "tags": "DEFINE FIELD tags ON user TYPE array"
      },
      "ft": {},
      "ix": {
        "idx_email": "DEFINE INDEX idx_email ON user FIELDS email UNIQUE"
      }
    }
  }
]
```

done we have a ready to play surrealdb database ready to use with `signup` and `signin`

> more info on [gist](https://gist.github.com/koakh/fbbc37cde630bedcf57acfd4d6a6956b)

## Now launch Consumer Apps

from root `package.json` 

### Rest Consumer App

```shell
# start dev
$ yarn start:app-rst

# start docker stack
$ docker:app-rst:up
$ docker:app-rst:down
```

### GraphQL Consumer App

```shell
# start dev
$ yarn start:app-gql

# start docker stack
$ docker:app-gql:up
$ docker:app-gql:down
```

### GraphQL Tutorial Consumer App

```shell
# start dev
$ yarn start:tutorial-graphql
```
