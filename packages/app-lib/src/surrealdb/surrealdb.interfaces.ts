import { UserServiceAbstract } from "./surrealdb.abstracts";

export interface SurrealDbModuleOptions {
  url: string;
  namespace: string;
  database: string;
  user: string;
  pass: string;
  userService?: UserServiceAbstract;
}
