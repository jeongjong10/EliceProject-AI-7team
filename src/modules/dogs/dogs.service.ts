import { Model } from 'mongoose'; // 몽구스 모델 임포트
import { Injectable, Inject } from '@nestjs/common'; // 네스트 의존성 주입 데코레이터 임포트
import { InjectModel } from '@nestjs/mongoose'; // 몽구스 의존성 주입 데코레이터 임포트
import { Dog } from './models/dog.schema';
import { VisitRequest } from './models/visitRequest.schema';
import { CreateDogDto } from './dto/create-dog.dto';
import { SearchDogListDto } from './dto/search-doglist.dto';
import { PagenationDogDto } from './dto/pagenation-dog.dto';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { CreateRequestDto } from './dto/create-request.dto';
import { Cache } from 'cache-manager';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class DogsService {
    constructor(
        @InjectModel(Dog.name) private dogModel: Model<Dog>,
        @InjectModel(VisitRequest.name)
        private RequestModel: Model<VisitRequest>,
        @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
        private readonly httpservice: HttpService
    ) {}

    // 유기견 전체 목록 조회
    async findDogsList(pagenationDogDto: PagenationDogDto): Promise<Dog[]> {
        const { limit, skip } = pagenationDogDto;
        return await this.dogModel
            .find()
            .skip(skip)
            .limit(limit)
            .sort({ 'notice.date_start': -1 });
    }

    // 사용자 이미지 검색 유기견 목록 조회
    // 사용자 보유한 '품종키워드'에 대한 데이터를 3분간(180초) 캐싱
    async searchDogList(searchDogListDto: SearchDogListDto): Promise<Dog[]> {
        const { limit, skip, breeds } = searchDogListDto;

        // 캐시 확인
        const cachedData: Dog[] = await this.cacheManager.get(
            breeds.toString()
        );
        if (cachedData) {
            return cachedData;
        }

        // 캐시 없으면 데이터 조회
        const searchedDogList = await this.dogModel
            .find({ breeds: decodeURI(breeds) })
            .skip(skip)
            .limit(limit)
            .sort({ 'notice.date_start': -1 });
        this.cacheManager.set(breeds.toString(), searchedDogList, 180);
        return searchedDogList;
    }

    // 특정 유기견 정보 조회
    async findDog(dogId: String): Promise<Dog> {
        return await this.dogModel.findOne({
            id: dogId,
        });
    }

    // 방문 예약 신청 데이터 생성
    async createRequest(createRequest: CreateRequestDto) {
        return await this.RequestModel.create(createRequest);
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

    // 품종 정보 추출 후 데이터 업데이트 (Nest -> Flask -> Nest)
    // 1. 데이터베이스에 존재하는 유기견을 하나씩 조회 find
    // 2. 조회된 유기견의 img_url을 Flask 서버로 전송 axios
    // 3. 반환되는 데이터를 breeds[]에 저장 update
    async patchMany() {
        const dogs = await this.dogModel.find();
        for (const dog of dogs) {
            const response = await firstValueFrom(
                this.httpservice.post('http://127.0.0.1:5000/breedsAI/admin', {
                    img_url: dog.img_url,
                })
            );
            const breedsList = response.data.data;
            await this.dogModel.updateOne(
                { id: dog.id },
                { breeds: breedsList }
            );
        }
        return;
    }
}
