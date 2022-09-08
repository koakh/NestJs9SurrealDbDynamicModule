import { IsString } from 'class-validator';

export declare class SyncDto {
  @IsString()
  query: string;

  @IsString()
  vars: string;
}
