import { UserServiceAbstract } from "./auth.abstracts";

export interface AuthModuleOptions {
  secret: string;
  expiresIn: string;
  userService: UserServiceAbstract;
}
