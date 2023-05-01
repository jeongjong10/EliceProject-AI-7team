import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type dogBreedsDocument = HydratedDocument<DogBreeds>;

@Schema()
export class DogBreeds {
    @Prop()
    breedName: String;

    @Prop()
    character: String[];
}

export const DogBreedsSchema = SchemaFactory.createForClass(DogBreeds);
