import { IsOptional, IsString } from 'class-validator';

export declare class SignupDto {
  @IsString()
  user: string;

  @IsString()
  pass: string;

  @IsOptional()
  @IsString()
  ns?: string;

  @IsOptional()
  @IsString()
  db?: string;

  @IsString()
  sc?: string;
}
