import { Model } from 'mongoose'; // 몽구스 모델 임포트
import { Injectable } from '@nestjs/common'; // 네스트 의존성 주입 데코레이터 임포트
import { InjectModel } from '@nestjs/mongoose'; // 몽구스 의존성 주입 데코레이터 임포트
import { Dog } from './schemas/dog.schema';
// import {CreateDogDto} from './dto/create-dog.dto'

@Injectable()
export class DogsService {
    constructor(@InjectModel(Dog.name) private dogModel: Model<Dog>) {}

    async create(dogsData): Promise<void> {
        await this.dogModel.insertMany(dogsData);
    }
}
