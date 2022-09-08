import { IsString } from 'class-validator';

export declare class UseDto {
  @IsString()
  ns: string;

  @IsString()
  db: string;
}
