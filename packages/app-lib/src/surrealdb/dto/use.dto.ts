import { IsString } from 'class-validator';

export declare class UseDto {
  @IsString()
  namespace: string;

  @IsString()
  database: string;
}
