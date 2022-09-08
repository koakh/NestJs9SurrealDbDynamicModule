import { IsNotEmpty, IsString } from "class-validator";

export class UpdateDto {
  @IsString()
  thing: string;

  @IsNotEmpty()
  data: any;
}
