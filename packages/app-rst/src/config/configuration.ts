import { EnvironmentVariables } from '../interfaces';

export const configuration = (): EnvironmentVariables => ({
  surrealDbUrl: process.env.SURREALDB_URL || 'http://127.0.0.1:8000/rpc',
  surrealDbNamespace: process.env.SURREALDB_NAMESPACE || 'test',
  surrealDbDatabase: process.env.SURREALDB_DATABASE || 'test',
  surrealDbUser: process.env.SURREALDB_USER || 'root',
  surrealDbPass: process.env.SURREALDB_PASS || 'root',
});