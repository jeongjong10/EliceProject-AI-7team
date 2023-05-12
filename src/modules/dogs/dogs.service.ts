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
        return await this.dogModel.find();
    }

    // 특정 유기견 정보 조회
    async findDog(dogId: String): Promise<Dog> {
        return await this.dogModel.findOne({
            id: dogId,
        });
    }

    //
    async findMany(findInfo: FindDogDto): Promise<Dog[]> {
        return await this.dogModel.find({
            // breeds: { $in: [...findInfo.breeds] },
            sex: findInfo.sex,
            birth: findInfo.birth,
        });
    }

    // 동물보호관리센터 메인 유기견 데이터 생성 (값 매핑)
    async createMany(createDogDto: CreateDogDto[]): Promise<Dog[]> {
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
