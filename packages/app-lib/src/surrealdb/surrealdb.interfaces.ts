import { UserServiceAbstract } from "./surrealdb.abstracts";

export interface SurrealDbModuleOptions {
  url: string;
  namespace: string;
  database: string;
  username: string;
  password: string;
  userService?: UserServiceAbstract;
}
