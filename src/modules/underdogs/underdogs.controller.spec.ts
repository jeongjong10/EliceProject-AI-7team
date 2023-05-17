import { Test, TestingModule } from '@nestjs/testing';
import { UnderdogsController } from './underdogs.controller';
import { UnderdogsService } from './underdogs.service';
import { PagenationDogDto } from './dto/pagenationdog.dto';
import { UnderDogs } from './entities/underdog.entity';

describe('UnderdogsController', () => {
    let controller: UnderdogsController;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UnderdogsController],
            providers: [UnderdogsService],
        }).compile();

        controller = module.get<UnderdogsController>(UnderdogsController);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('getDogsList', () => {
        it('유기견 전체 목록을 조회합니다. (limit, skip 사용)', async () => {
            const pagenationDogDto: PagenationDogDto = {
                skip: 0,
                limit: 1,
            };
            const res = '';
            const dog = {
                a: 1,
                v: 2,
            };
            expect(
                await controller.getDogsList(res, pagenationDogDto)
            ).toStrictEqual(dog);
        });
    });
});
