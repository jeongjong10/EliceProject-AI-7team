import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type dogBreedsDocument = HydratedDocument<DogBreeds>;

@Schema()
export class DogBreeds {
    @Prop()
    breeds: String;
}
