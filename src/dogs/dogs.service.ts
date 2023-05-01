import { Model } from 'mongoose'; // 몽구스 모델 임포트
import { Injectable } from '@nestjs/common'; // 네스트 의존성 주입 데코레이터 임포트
import { InjectModel } from '@nestjs/mongoose'; // 몽구스 의존성 주입 데코레이터 임포트
import { Dog } from './models/dog.schema';
import { CreateDogDto } from './dto/create-dog.dto';
import { FindDogDto } from './dto/find-dog.dto';

@Injectable()
export class DogsService {
    constructor(@InjectModel(Dog.name) private dogModel: Model<Dog>) {}

    // 유기견 전체 목록 조회
    async findDogsList(): Promise<Dog[]> {
        return await this.dogModel.find({});
    }

    // 특정 유기견 정보 조회
    async findDog(dogId: String): Promise<Dog> {
        console.log('dogId : ', dogId);
        return await this.dogModel.findOne({
            id: dogId,
        });
    }

    //
    async findMany(findInfo: FindDogDto): Promise<Dog[]> {
        console.log('findInfo : ', findInfo);
        return await this.dogModel.find({
            breeds: { $in: [...findInfo.breeds] },
        });
    }

    async createMany(createDogDto: CreateDogDto[]): Promise<Dog[]> {
        console.log('Service : ', createDogDto);
        const createDogs = createDogDto.map((dog) => ({
            id: dog.desertionNo,
            state: dog.processState,
            img_url: dog.popfile,
            found: {
                date: dog.happenDt,
                place: dog.happenPlace,
            },
            color: dog.colorCd,
            birth: dog.age,
            weight: dog.weight,
            sex: dog.sexCd,
            neuter: dog.neuterYn,
            memo: dog.specialMark,
            notice: {
                code: dog.noticeNo,
                date_start: dog.noticeSdt,
                date_end: dog.noticeEdt,
            },
            careCenter: {
                name: dog.careNm,
                phone: dog.careTel,
                address: dog.careAddr,
            },
        }));

        return await this.dogModel.insertMany(createDogs);
    }
}

// const createDog = {
//     id: createDogDto.desertionNo,
//     state: createDogDto.processState,
//     img_url: createDogDto.popfile,
//     found: {
//         date: createDogDto.happenDt,
//         place: createDogDto.happenPlace,
//     },
//     color: createDogDto.colorCd,
//     birth: createDogDto.age,
//     weight: createDogDto.weight,
//     sex: createDogDto.sexCd,
//     neuter: createDogDto.neuterYn,
//     memo: createDogDto.specialMark,
//     notice: {
//         code: createDogDto.noticeNo,
//         date_start: createDogDto.noticeSdt,
//         date_end: createDogDto.noticeEdt,
//     },
//     careCenter: {
//         name: createDogDto.careNm,
//         phone: createDogDto.careTel,
//         address: createDogDto.careAddr,
//     },
// };
