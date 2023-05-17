import { IsString } from 'class-validator';

export class CreateBreeds {
    @IsString()
    breeds: String; // (품종명) -> breedName

    @IsString()
    character: String[]; // (특성) -> Temperment
}
