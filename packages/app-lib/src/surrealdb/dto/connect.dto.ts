import { IsString } from 'class-validator';

export declare class ConnectDto {
  @IsString()
  url: string;
}
