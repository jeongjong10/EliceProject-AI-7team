import { Model } from 'mongoose'; // 몽구스 모델 임포트
import { Injectable } from '@nestjs/common'; // 네스트 의존성 주입 데코레이터 임포트
import { InjectModel } from '@nestjs/mongoose'; // 몽구스 의존성 주입 데코레이터 임포트
import { Dog } from './schemas/dog.schema';
import { CreateDogDto } from './dto/create-dog.dto';

@Injectable()
export class DogsService {
    constructor(@InjectModel(Dog.name) private dogModel: Model<Dog>) {}

    async create(createDogDto: CreateDogDto): Promise<Dog[]> {
        const createDog = {
            id: createDogDto.getDesertionNo(),
            state: createDogDto.getProtectState(),
            img_url: createDogDto.getPopfile(),
            found: {
                date: createDogDto.getHappenDt(),
                place: createDogDto.getHappenPlace(),
            },
            breeds: createDogDto.getKindCd,
            color: createDogDto.getColorCd,
            birth: createDogDto.getAge,
            weight: createDogDto.getWeight,
            sex: createDogDto.getSexCd,
            neuter: createDogDto.getNeuterYn,
            memo: createDogDto.getSpecialMark,
            notice: {
                code: createDogDto.getNoticeNo,
                date_start: createDogDto.getNoticeSdt,
                date_end: createDogDto.getNoticeEdt,
            },
            carecenter: {
                name: createDogDto.getCareNm,
                phone: createDogDto.getCareTel,
                address: createDogDto.getCareAddr,
            },
        };
        return await this.dogModel.insertMany(createDog);
    }
}
