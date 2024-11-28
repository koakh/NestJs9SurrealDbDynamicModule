import { EnvironmentVariables } from '../interfaces';

export const configuration = (): EnvironmentVariables => ({
  httpServerPort: process.env.HTTP_SERVER_PORT || '3030',
  surrealDbUrl: process.env.SURREALDB_URL || 'ws://127.0.0.1:8000/rpc',
  surrealDbNamespace: process.env.SURREALDB_NAMESPACE || 'test',
  surrealDbDatabase: process.env.SURREALDB_DATABASE || 'test',
  surrealDbUser: process.env.SURREALDB_USERNAME || 'root',
  surrealDbPass: process.env.SURREALDB_PASSWORD || 'root',
});