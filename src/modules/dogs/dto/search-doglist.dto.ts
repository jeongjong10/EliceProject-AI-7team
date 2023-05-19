import { IsDefined, IsNumber, IsString } from 'class-validator';
import { PagenationDogDto } from './pagenation-dog.dto';

export class SearchDogListDto extends PagenationDogDto {
    @IsDefined()
    @IsString()
    breeds: String;

    @IsString()
    sex?: String;

    @IsNumber()
    birth?: Number;

    @IsString()
    neuter?: String;
}
