import { Inject, Injectable } from "@nestjs/common";
import Surreal from 'surrealdb.js';
import { SignUpInResponseDto as SignUpInResponseDto } from "./dto/signup-in-response.dto";
import { SurrealDbResponseDto } from "./dto/surrealdb-response.dto";
import { Signin, Signup, SurrealDb } from "./interfaces";
import { AppServiceAbstract, UserServiceAbstract } from "./surrealdb.abstracts";
import { adminCurrentUser, APP_SERVICE, SURREALDB_MODULE_OPTIONS, SURREALDB_MODULE_USER_SERVICE } from './surrealdb.constants';
import { SurrealDbModuleOptions } from './surrealdb.interfaces';
import { SurrealDbUser as User } from './types';

@Injectable()
export class SurrealDbService {
  private db: SurrealDb;

  constructor(
    @Inject(SURREALDB_MODULE_OPTIONS)
    private readonly options: SurrealDbModuleOptions,
    @Inject(SURREALDB_MODULE_USER_SERVICE)
    private readonly userService: UserServiceAbstract,
    @Inject(APP_SERVICE)
    private readonly appService: AppServiceAbstract,
  ) {
    this.initSurrealDb();
  }

  // SurrealDbModuleOptions
  getConfig(): SurrealDbModuleOptions {
    return this.options;
  }

  // TODO: remove
  // AppServiceAbstract: this is from consumer app AppModule/AppService
  getHelloAppModule(): { message: string } {
    return { message: `${this.appService.getHello()} (called in SurrealDbService.etHelloAppModule())` };
  }

  // TODO: remove
  // UserServiceAbstract: this is from consumer app AppModule/UserService
  getUserFindOneByField(): Promise<User> {
    return this.userService.findOneByField('username', 'admin', adminCurrentUser);
  }

  // initSurrealDb

  private async initSurrealDb() {
    // init surrealDb instance
    this.db = new Surreal(this.options.url);
    // signIn as a namespace, database, or root user
    this.db.signin({
      user: this.options.user,
      pass: this.options.pass,
    });
    // select a specific namespace / database
    await this.db.use(this.options.namespace, this.options.database);
  }

  // helper methods

  /**
   * check if thing exists if passed id with entity, else does nothing
   * @param thing 
   */
  async thingExists(thing: string): Promise<void> {
    if (thing.split(':').length === 2) {
      if (!await this.db.select(thing)) {
        // mimic surrealdb response
        throw new Error(`Record not found: ${thing}`);
      }
    }
  }

  // surrealDb Proxy methods

  /**
   * Connects to a local or remote database endpoint
   * @param url The url of the database endpoint to connect to.
   */
  async connect(url: string): Promise<any> {
    return this.db.connect(url);
  }

  /**
   * waits for the connection to the database to succeed
   */
  async wait(): Promise<any> {
    return this.db.wait();
  }

  /**
 * closes the persistent connection to the database
 */
  async close(): Promise<any> {
    return this.db.close();
  }

  /**
   * switch to a specific namespace and database
   * @param ns Switches to a specific namespace.
   * @param db Switches to a specific database.
   */
  async use(ns?: string, db?: string): Promise<any> {
    return this.db.use(ns || this.options.namespace, db || this.options.database);
  }

  /**
   * signs this connection up to a specific authentication scope
   * @param vars Variables used in a signup query.
   */
  async signup(vars: Signup): Promise<SignUpInResponseDto> {
    return { accessToken: this.db.signup(vars) };
  }

  /**
   * signs this connection in to a specific authentication scope
   * @param vars Variables used in a signin query.
   */
  async signin(vars: Signin): Promise<SignUpInResponseDto> {
    return { accessToken: this.db.signin(vars) };
  }

  /**
   * invalidates the authentication for the current connection
   */
  async invalidate(): Promise<any> {
    return this.db.invalidate();
  }

  /**
   * authenticates the current connection with a JWT token
   * @param token The JWT authentication token.
   */
  async authenticate(token: string): Promise<any> {
    return this.db.authenticate(token);
  }

  /**
   * assigns a value as a parameter for this connection
   * @param key Specifies the name of the variable.
   * @param val Assigns the value to the variable name.
   */
  async let(key: string, val: any): Promise<any> {
    return this.db.let(key, val);
  }

  /**
   * runs a set of SurrealQL statements against the database
   * @param thing The table name or the specific record id to create.
   * @param vars Assigns variables which can be used in the query.
   */
  async query(sql: string, vars?: any): Promise<SurrealDbResponseDto> {
    return this.db.query(sql, vars);
  }

  /**
   * selects all records in a table, or a specific record
   * @param thing The table name or a record id to select.
   */
  async select(thing: string): Promise<SurrealDbResponseDto> {
    return this.db.select(thing);
  }

  /**
   * creates a record in the database
   * @param thing The table name or the specific record id to create.
   * @param data The document / record data to insert.
   */
  async create(thing: string, data: any): Promise<any> {
    return this.db.create(thing, data);
  }

  /**
   * updates all records in a table, or a specific record
   * @param thing The table name or the specific record id to update.
   * @param data The document / record data to update.
   */
  async update(thing: string, data: any): Promise<SurrealDbResponseDto> {
    await this.thingExists(thing);
    return this.db.update(thing, data);
  }

  /**
   * modifies all records in a table, or a specific record
   * @param thing The table name or the specific record id to change.
   * @param data The document / record data to change.
   */
  async change(thing: string, data: any): Promise<SurrealDbResponseDto> {
    await this.thingExists(thing);
    return this.db.change(thing, data);
  }

  /**
   * modifies all records in a table, or a specific record
   * @param thing The table name or the specific record id to change.
   * @param data The document / record data to change.
   */
  async modify(thing: string, data: any): Promise<SurrealDbResponseDto> {
    await this.thingExists(thing);
    return this.db.modify(thing, data);
  }

  /**
   * surrealdb delete proxy method
   * @param data arbitrary data
   * @returns 
   */
  async delete(thing: string): Promise<SurrealDbResponseDto> {
    await this.thingExists(thing);
    const data = await this.db.delete(thing);
    return data;
  }

  /**
   * sync
   * @param query
   * @param vars
   */
  async sync(query: string, vars: any): Promise<any> {
    return this.db.sync(query, vars);
  }

  /**
   * ping
   */
  async ping(): Promise<any> {
    return this.db.ping();
  }

  /**
   * info
   */
  async info(): Promise<any> {
    return this.db.info();
  }

  /**
 * live
 * @param table
 */
  async live(table: string): Promise<any> {
    return this.db.live(table);
  }

  /**
 * kill
 * @param query
 */
  async kill(query: string): Promise<any> {
    return this.db.kill(query);
  }

}
