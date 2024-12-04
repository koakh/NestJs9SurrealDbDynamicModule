define namespace test;
define database test;
-- use ns test db test;

-- https://surrealdb.com/docs/surrealql/statements/define/table#defining-permissions
-- define table user schemafull permissions full;
define table overwrite user schemafull permissions 
  -- this will be used to check permission when we are signin and select all users
  for select where id = $auth.id or $auth.admin = true,  
  for create full, 
  for update, delete where id = $auth.id or $auth.admin = true;

define field overwrite username on user type string assert $value != NONE;
define field overwrite password on user type string assert $value != NONE;
-- flexible
define field overwrite settings on user flexible type object default {};
define field overwrite settings.marketing on user type bool default false;
define field overwrite tags on user type option<array<string>> default [];
define index overwrite idx_username on user columns username unique;

-- defining access in your application
-- https://surrealdb.com/docs/sdk/javascript/core/handling-authentication#defining-access-in-your-application
-- define access method/function
define access account on database type record
	signup ( create user set username = $username, password = crypto::argon2::generate($password), settings.marketing = $marketing, tags = $tags )
	signin ( select * from user where username = $username and crypto::argon2::compare(password, $password) )
	duration for token 15m, for session 12h;

-- info for db;
-- info for table user;

-- test functions
DEFINE FUNCTION fn::greet($name: string) {
	RETURN "Hello, " + $name + "!";
};
-- RETURN fn::greet("Tobie");