import { AuthModuleOptions } from './surrealdb.interfaces';
export declare const createNestGraphqlAuthModuleProviders: {
    provide: symbol;
    useFactory: (authModuleOptions: AuthModuleOptions) => Promise<import("./auth.abstracts").UserServiceAbstract>;
    inject: symbol[];
}[];
