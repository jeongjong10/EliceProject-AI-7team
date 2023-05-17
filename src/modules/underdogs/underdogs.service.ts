import { Injectable } from '@nestjs/common';
import { PagenationDogDto } from './dto/pagenationdog.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UnderDogs } from './entities/underdog.entity';
import { Repository } from 'typeorm';
import { UploadDogsDto } from './dto/uploaddogs.dto';
import { Notice } from './entities/notice.entity';
import { CareCeter } from './entities/carecenter.entity';

@Injectable()
export class UnderdogsService {
    constructor(
        @InjectRepository(UnderDogs)
        private underdogsRepository: Repository<UnderDogs>
    ) {}

    async findDogsList(
        pagenationDogDto: PagenationDogDto
    ): Promise<UnderDogs[]> {
        const { skip, limit } = pagenationDogDto;
        return await this.underdogsRepository.find({
            take: limit,
            skip: skip,
            order: { found_date: 'DESC' },
        });
    }

    async searchDogsList(dogBreeds): Promise<UnderDogs[] | null> {
        const { limit, skip, breeds } = dogBreeds;
        return await this.underdogsRepository.find({
            where: { breeds },
            take: limit,
            skip: skip,
            order: { found_date: 'DESC' },
        });
    }

    async getDogOne(dogId): Promise<UnderDogs | null> {
        return await this.underdogsRepository.findOne({
            where: { id: dogId },
        });
    }

    async createDogsMany(createDogData: UploadDogsDto[]): Promise<UnderDogs[]> {
        const createDogs: UnderDogs[] = createDogData.map((dog) => {
            const underdog = new UnderDogs();
            underdog.id = dog.desertionNo;
            underdog.state = dog.processState;
            underdog.img_url = dog.popfile;
            underdog.color = dog.colorCd;
            underdog.birth = dog.age;
            underdog.weight = dog.weight;
            underdog.sex = dog.sexCd;
            underdog.neuter = dog.neuterYn;
            underdog.memo = dog.specialMark;
            underdog.found_date = dog.happenDt;
            underdog.found_place = dog.happenPlace;

            const notice = new Notice();
            notice.code = dog.noticeNo;
            notice.date_start = dog.noticeSdt;
            notice.dateEnd = dog.noticeEdt;
            underdog.notice = notice;

            const carecenter = new CareCeter();
            carecenter.name = dog.careNm;
            carecenter.phone = dog.careTel;
            carecenter.address = dog.careAddr;
            underdog.carecenter = carecenter;

            return underdog;
        });
        return await this.underdogsRepository.save(createDogs);
    }
}
