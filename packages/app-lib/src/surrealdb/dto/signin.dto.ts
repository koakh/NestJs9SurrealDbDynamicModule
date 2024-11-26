import { IsOptional, IsString } from 'class-validator';

export declare class SigninDto {
  // The username of the database user
  // required for root, namespace & database
  @IsString()
  username: string;

  // The password of the database user
  // required for root, namespace & database
  @IsString()
  password: string;

  // The namespace to sign in to
  // required for database & scope/access
  @IsString()
  namespace: string;

  // The database to sign in to
  // required for scope/access
  @IsString()
  database?: string;

  // The scope to sign in to. Also pass any variables used in the scope.
  // Only supported in SurrealDB 1.x
  @IsString()
  scope?: string;

  // The access to sign in to. Also pass any variables used in the access.
  // Only supported from SurrealDB 2.x onwards
  @IsString()
  access?: string;
}
