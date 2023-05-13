import { IsNumber } from 'class-validator';

export class PagenationDogDto {
    @IsNumber()
    limit: number;

    @IsNumber()
    skip: number;
}
