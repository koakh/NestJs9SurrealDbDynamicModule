import { IsNotEmpty } from 'class-validator';

export declare class DataDto {
  @IsNotEmpty()
  data: any;
}
