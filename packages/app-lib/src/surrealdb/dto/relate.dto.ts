import { IsObject, IsOptional, IsString } from 'class-validator';

export declare class RelateDto {
  @IsString()
  from: string;

  @IsString()
  to: string;

  @IsObject()
  @IsOptional()
  data?: any;
}
