import { IsNumber, IsString } from 'class-validator';

export class FindDogDto {
    @IsString()
    breeds: String[];

    @IsString()
    sex?: String;

    @IsNumber()
    birth?: Number;

    @IsString()
    neuter?: String;
}
