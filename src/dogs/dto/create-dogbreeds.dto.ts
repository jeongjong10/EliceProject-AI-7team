import { IsString } from 'class-validator';

export class CreateDogBreeds {
    @IsString()
    breeds: String; // (품종명) -> breedName

    @IsString()
    character: String[]; // (특성) -> Temperment
}
