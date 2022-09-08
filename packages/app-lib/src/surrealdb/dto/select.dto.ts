import { IsNotEmpty } from 'class-validator';

export declare class SelectDto {
    @IsNotEmpty()
    thing: string;
}
