import { IsNumber, IsString } from 'class-validator';

export class SearchDogListDto {
    @IsString()
    breeds: String[];

    @IsString()
    sex?: String;

    @IsNumber()
    birth?: Number;

    @IsString()
    neuter?: String;
}
