import { IsString } from 'class-validator';

export declare class LetDto {
  @IsString()
  key: string;

  @IsString()
  val: string;
}
