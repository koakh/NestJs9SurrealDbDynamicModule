import { IsNotEmpty } from 'class-validator';

export declare class ChangeDto {
    @IsNotEmpty()
    data: any;
}
