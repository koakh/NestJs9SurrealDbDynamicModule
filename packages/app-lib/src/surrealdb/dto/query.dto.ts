import { IsOptional, IsString } from 'class-validator';

export declare class QueryDto {
  @IsString()
  sql: string;

  @IsOptional()
  @IsString()
  vars: string;
}
