import { Model } from 'mongoose'; // 몽구스 모델 임포트
import { Injectable } from '@nestjs/common'; // 네스트 의존성 주입 데코레이터 임포트
import { InjectModel } from '@nestjs/mongoose'; // 몽구스 의존성 주입 데코레이터 임포트
import { Dog } from './models/dog.schema';
import { CreateDogDto } from './dto/create-dog.dto';
import { SearchDogListDto } from './dto/search-doglist.dto';
import { PagenationDogDto } from './dto/pagenation-dog.dto';

@Injectable()
export class DogsService {
    constructor(@InjectModel(Dog.name) private dogModel: Model<Dog>) {}

    // 유기견 전체 목록 조회
    async findDogsList(pagenationDogDto: PagenationDogDto): Promise<Dog[]> {
        const { limit, skip } = pagenationDogDto;
        return await this.dogModel.find().skip(skip).limit(limit);
    }

    // 사용자 이미지 검색 유기견 목록 조회
    async searchDogList(searchDogListDto: SearchDogListDto): Promise<Dog[]> {
        const { limit, skip, sex } = searchDogListDto;
        console.log(searchDogListDto);

        delete searchDogListDto.limit;
        delete searchDogListDto.skip;
        // delete searchDogListDto.breeds;
        console.log(searchDogListDto);

        return await this.dogModel.find({ sex }).skip(skip).limit(limit);
    }

    // 특정 유기견 정보 조회
    async findDog(dogId: String): Promise<Dog> {
        return await this.dogModel.findOne({
            id: dogId,
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
