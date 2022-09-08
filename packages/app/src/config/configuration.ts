import { EnvironmentVariables } from "../interfaces";

export const configuration = (): EnvironmentVariables => ({
  url: process.env.SURREALDB_URL || 'http://127.0.0.1:8000/rpc',
  namespace: process.env.SURREALDB_NAMESPACE || 'test',
  database: process.env.SURREALDB_DATABASE || 'test',
  user: process.env.SURREALDB_USER || 'root',
  pass: process.env.SURREALDB_PASS || 'root',
});