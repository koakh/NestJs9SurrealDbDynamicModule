import { AuthModuleOptions } from './surrealdb.interfaces';
import { AppServiceAbstract, UserServiceAbstract } from "./auth.abstracts";
import { AuthUser as User } from './types';
export declare class AuthService {
    private readonly appService;
    private readonly authModuleOptions;
    private readonly userService;
    private authStore;
    constructor(appService: AppServiceAbstract, authModuleOptions: AuthModuleOptions, userService: UserServiceAbstract);
    addUser(username: string, tokenVersion: number): {
        username: string;
        tokenVersion: number;
    };
    incrementTokenVersion(username: string): {
        username: string;
        tokenVersion: number;
    };
    getConfig(): AuthModuleOptions;
    getHelloAppModule(): {
        message: string;
    };
    getUserFindOneByField(): Promise<User>;
}
