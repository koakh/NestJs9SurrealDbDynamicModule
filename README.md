# README

- [README](#readme)
  - [Project Components](#project-components)
    - [NestJs SurrealDb Dynamic Module](#nestjs-surrealdb-dynamic-module)
    - [REST Consumer App](#rest-consumer-app)
    - [GraphQL Consumer App](#graphql-consumer-app)
    - [GraphQL DataLoader Package](#graphql-dataloader-package)
    - [GraphQL SurrealDb Tutorial](#graphql-surrealdb-tutorial)
  - [Configure Dev Environment](#configure-dev-environment)
  - [Install and Run SurrealDb](#install-and-run-surrealdb)
    - [Install SurrealDb](#install-surrealdb)
      - [Install on macOS](#install-on-macos)
      - [Install on Linux](#install-on-linux)
      - [Install on Windows](#install-on-windows)
    - [Start SurrealDb Instance](#start-surrealdb-instance)
  - [Init surrealDb Database](#init-surrealdb-database)
  - [Now launch Consumer Apps](#now-launch-consumer-apps)
    - [REST Consumer App](#rest-consumer-app-1)
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

## Configure Dev Environment

requirements `node` and `npm`

this project use yarn workspaces, so start to install yarn and workspace dependencies

- [Installation | Yarn](https://yarnpkg.com/getting-started/install)

> The preferred way to manage Yarn is by-project and through `Corepack`, a tool shipped by default with Node.js. Modern releases of Yarn aren't meant to be installed globally, or from npm.

```shell
$ node -v
v23.1.0
# remove old yarn.lock if exists
$ rm yarn.lock
# enable corepack
$ corepack enable
# update to latest version
$ yarn set version stable
$ yarn --version
4.5.2
# install workspace dependecies
$ yarn install
...
➤ YN0007: │ root@workspace:. must be built because it never has been before or the last one failed
...
wait until that process finishes


➤ YN0000: ┌ Link step
➤ YN0007: │ root@workspace:. must be built because it never has been before or the last one failed
➤ YN0009: │ root@workspace:. couldn't be built successfully (exit code 1, logs can be found here: /tmp/xfs-a0bf80aa/build.log)
➤ YN0000: └ Completed in 1m 19s
➤ YN0000: · Failed with errors in 1m 21s
```

## Install and Run SurrealDb

### Install SurrealDb

first install SurrealDb. full instruction at [SurrealDB | Install](https://surrealdb.com/install)

#### Install on macOS

```shell
$ brew install surrealdb/tap/surreal
```

#### Install on Linux

```shell
$ curl -sSf https://install.surrealdb.com | sh
$ sudo mv /home/c3/.surrealdb/surreal /usr/local/bin
```

#### Install on Windows

```shell
$ iwr https://windows.surrealdb.com -useb | iex
```

### Start SurrealDb Instance

- [SurrealDB | Documentation](https://surrealdb.com/docs/start/starting-surrealdb)

```shell
# start surream with rocksdb
$ yarn surreal

# outcome
 .d8888b.                                             888 8888888b.  888888b.
d88P  Y88b                                            888 888  'Y88b 888  '88b
Y88b.                                                 888 888    888 888  .88P
 'Y888b.   888  888 888d888 888d888  .d88b.   8888b.  888 888    888 8888888K.
    'Y88b. 888  888 888P'   888P'   d8P  Y8b     '88b 888 888    888 888  'Y88b
      '888 888  888 888     888     88888888 .d888888 888 888    888 888    888
Y88b  d88P Y88b 888 888     888     Y8b.     888  888 888 888  .d88P 888   d88P
 'Y8888P'   'Y88888 888     888      'Y8888  'Y888888 888 8888888P'  8888888P'


2024-11-25T11:47:45.498218Z  INFO surreal::env: Running 2.1.0 for linux on x86_64
2024-11-25T11:47:45.499027Z  INFO surrealdb::core::kvs::ds: Starting kvs store at rocksdb://database
2024-11-25T11:47:45.546100Z  INFO surrealdb::core::kvs::ds: Started kvs store at rocksdb://database
2024-11-25T11:47:45.550552Z  WARN surrealdb::core::kvs::ds: Credentials were provided, but existing root users were found. The root user 'root' will not be created
2024-11-25T11:47:45.550748Z  WARN surrealdb::core::kvs::ds: Consider removing the --user and --pass arguments from the server start command
2024-11-25T11:47:45.554246Z  INFO surrealdb::net: Listening for a system shutdown signal.
2024-11-25T11:47:45.554092Z  INFO surrealdb::net: Started web server on 0.0.0.0:8000
```

## Init surrealDb Database

import the `initdb.sql`

```shell
# import schemafull
$ yarn surreal:initdb
# outcome
[2022-09-05 23:07:01] INFO  surrealdb::cli The SQL file was imported successfully

# check info for db
$  echo "INFO FOR DB;" | surreal sql --json --hide-welcome --pretty --conn http://localhost:8000 --user root --pass root --ns test --db test
-- Query 1 (execution time: 609.242µs
{
  "accesses": {
    "allusers": "DEFINE ACCESS allusers ON DATABASE TYPE RECORD SIGNUP (CREATE user SET settings.marketing = $marketing, email = $email, pass = crypto::argon2::generate($pass), tags = $tags) SIGNIN (SELECT * FROM user WHERE email = $email AND crypto::argon2::compare(pass, $pass)) WITH JWT ALGORITHM HS512 KEY '[REDACTED]' WITH ISSUER KEY '[REDACTED]' DURATION FOR TOKEN 1h, FOR SESSION 2w"
  },
  "analyzers": {},
  "configs": {},
  "functions": {},
  "models": {},
  "params": {},
  "tables": {
    "person": "DEFINE TABLE person TYPE ANY SCHEMALESS PERMISSIONS FULL",
    "user": "DEFINE TABLE user TYPE NORMAL SCHEMAFULL PERMISSIONS FOR select, update WHERE id = $auth.id, FOR create, delete NONE"
  },
  "users": {}
}

# check info for user
$ echo "INFO FOR TABLE user;" | surreal sql --json --hide-welcome --pretty --conn http://localhost:8000 --user root --pass root --ns test --db test

-- Query 1 (execution time: 326.369987ms
{
	"events": {},
	"fields": {
		"email": "DEFINE FIELD email ON user TYPE string PERMISSIONS FULL",
		"pass": "DEFINE FIELD pass ON user TYPE string PERMISSIONS FULL",
		"settings.marketing": "DEFINE FIELD settings.marketing ON user TYPE string PERMISSIONS FULL",
		"settings[*]": "DEFINE FIELD settings[*] ON user TYPE object PERMISSIONS FULL",
		"tags": "DEFINE FIELD tags ON user TYPE array PERMISSIONS FULL"
	},
	"indexes": {
		"idx_email": "DEFINE INDEX idx_email ON user FIELDS email UNIQUE"
	},
	"lives": {},
	"tables": {}
}
```

done we have a ready to play surrealdb database ready to use with `signup` and `signin`

> more info on [gist](https://gist.github.com/koakh/fbbc37cde630bedcf57acfd4d6a6956b)

## Now launch Consumer Apps

from root `package.json`

### REST Consumer App

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
