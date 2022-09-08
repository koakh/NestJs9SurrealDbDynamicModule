import { IsNotEmpty, IsString } from "class-validator";

export class ModifyDto {
  @IsString()
  thing: string;

  @IsNotEmpty()
  data: any;
}
