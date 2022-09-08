import { IsNotEmpty } from 'class-validator';

export declare class CreateDto {
  @IsNotEmpty()
  data: any;
}
