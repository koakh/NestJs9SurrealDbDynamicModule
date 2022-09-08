import { IsString } from 'class-validator';

export declare class AuthenticateDto {
  @IsString()
  token: string;
}
