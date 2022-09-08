// https://github.com/surrealdb/surrealdb.js/blob/main/src/index.js
// https://github.com/surrealdb/www.surrealdb.com/blob/main/app/templates/docs/integration/libraries/nodejs.hbs

export interface Signup {
  ns?: string;
  db?: string;
  sc?: string;
  email: string;
  pass: string;
}

export interface Signin {
  ns?: string;
  db?: string;
  sc?: string;
  user: string;
  pass: string;
}

export interface SurrealDb {
  /**
   * Connects to a local or remote database endpoint
   * @param url The url of the database endpoint to connect to.
   */
  connect: (url: string) => any;

  /**
  * waits for the connection to the database to succeed
  */
  wait: () => any;

  /**
  * closes the persistent connection to the database
  */
  close: () => any;

  /**
   * switch to a specific namespace and database
   * @param ns Switches to a specific namespace.
   * @param db Switches to a specific database.
   */
  use: (ns: string, db: string) => any;

  /**
   * signs this connection up to a specific authentication scope
   * @param vars Variables used in a signup query.
   */
  signup: (vars: Signup) => any;

  /**
   * signs this connection in to a specific authentication scope
   * @param vars Variables used in a signin query.
   */
  signin: (vars: Signin) => any;

  /**
   * invalidates the authentication for the current connection
   */
  invalidate: () => any;

  /**
   * authenticates the current connection with a JWT token
   * @param token The JWT authentication token.
   */
  authenticate: (token: string) => any;

  /**
   * assigns a value as a parameter for this connection
   * @param key Specifies the name of the variable.
   * @param val Assigns the value to the variable name.
   */
  let: (key: string, val: any) => any;

  /**
   * runs a set of SurrealQL statements against the database
   * @param thing The table name or the specific record id to create.
   * @param vars Assigns variables which can be used in the query.
   */
  query: (sql: string, vars?: any) => any;

  /**
   * selects all records in a table, or a specific record
   * @param thing The table name or a record id to select.
   */
  select: (thing: string) => any;

  /**
   * creates a record in the database
   * @param thing The table name or the specific record id to create.
   * @param data The document / record data to insert.
   */
  create: (thing: string, data: any) => any;

  /**
   * updates all records in a table, or a specific record
   * @param thing The table name or the specific record id to update.
   * @param data The document / record data to update.
   */
  update: (thing: string, data: any) => any;

  /**
   * modifies all records in a table, or a specific record
   * @param thing The table name or the specific record id to change.
   * @param data The document / record data to change.
   */
  change: (thing: string, data: any) => any;

  /**
   * changes to all records in a table, or a specific record
   * @param thing The table name or the specific record id to change.
   * @param data The JSON Patch data with which to modify the records.
   * @link https://jsonpatch.com
   */
  modify: (thing: string, data: any) => any;

  /**
   * deletes all records, or a specific record
   * @param thing The table name or a record id to delete.
   */
  delete: (thing: string) => any;

  // sync, live, and kill aren't fully implemented yet, so you can add those in, but don't expect them to work just yet!

  /**
   * sync
   * @param query
   * @param vars
   */
  sync: (query: string, vars: any) => any;

  /**
   * ping: ping is used internally. It doesn't need to be called from any client code
   */
  ping: () => any;

  /**
   * info
   */
  info: () => any;

  /**
   * live query
   * @param table
   */
  live: (table: string) => any;

  /**
   * kill live query
   * @param query
   */
  kill: (query: string) => any;
}