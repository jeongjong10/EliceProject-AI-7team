import { IsDate, IsString } from 'class-validator';

export class CreateRequestDto {
    @IsString()
    dog_id: String;

    @IsString()
    name: String;

    @IsString()
    phone: String;

    @IsDate()
    when_day: Date;

    @IsString()
    when_time: String;
}
