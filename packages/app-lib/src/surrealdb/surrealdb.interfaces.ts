import { UserServiceAbstract } from "./surrealdb.abstracts";

export interface SurrealDbModuleOptions {
  secret: string;
  expiresIn: string;
  userService: UserServiceAbstract;
}
