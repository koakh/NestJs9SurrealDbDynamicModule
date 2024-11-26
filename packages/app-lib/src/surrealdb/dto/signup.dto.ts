import { IsObject, IsOptional, IsString } from 'class-validator';

export declare class SignupDto {
  // The namespace to sign up to
  // required
  @IsString()
  namespace?: string;

  // The database to sign up to
  // required
  @IsString()
  database?: string;

  // The scope to sign up to. Also pass any variables used in the scope.
  // Only supported in SurrealDB 1.x
  // required
  @IsString()
  scope?: string;

  // The access to sign in to. Also pass any variables used in the access.
  // Only supported from SurrealDB 2.x onwards
  // required
  @IsString()
  access?: string;

  @IsOptional()
  @IsObject()
  // Also pass any properties required by the scope definition
  variables?: { [key: string]: string };
}
