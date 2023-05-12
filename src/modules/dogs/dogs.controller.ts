import { Controller, Get, Post, Body, Res, Param, Query } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { Dog } from './models/dog.schema';
import { FindDogDto } from './dto/find-dog.dto';

// 컨트롤러 파일 (라우터)

// 컨트롤러 데코레이터 : 라우팅 경로 매핑
@Controller('underdogs')
export class DogsController {
    constructor(private readonly DogsService: DogsService) {}

    // 유기견 전체 목록 조회, 특정 유기견 id 검색 및 조회
    @Get('/')
    async getDogsListController(@Res() res, @Query('id') id: String) {
        // (then, cathch문 사용)
        if (!id) {
            this.DogsService.findDogsList()
                .then((dogsList) =>
                    res.json({
                        message: '유기견 전체 목록 조회 성공',
                        data: dogsList,
                    })
                )
                .catch((err) => {
                    res.json(err);
                });
        } else {
            // async await문 사용
            const dog: Dog = await this.DogsService.findDog(id);
            res.json({
                message: '특정 유기견 정보 조회 성공',
                data: dog,
            });
        }
    }

    // 사용자 입력 정보 기반 유기견 정보 조회 (리턴문으로 데이터 반환)
    @Post()
    async findDogController(@Body() findDog: FindDogDto) {
        const foundedDog: Dog[] = await this.DogsService.findMany(findDog);
        return {
            message: '사용자 조건에 맞는 유기견 정보 조회 성공',
            data: foundedDog,
        };
    }

    // 유기견 데이터 입력 (Flask -> Nest)
    @Post('upload')
    async uploadDataController(
        @Body() createDogData: CreateDogDto[],
        @Res() res
    ) {
        console.log('Controller : ', createDogData);
        const createdDog = await this.DogsService.createMany(createDogData);
        res.json({
            message: '유기견 데이터 입력 성공',
            data: createdDog,
        });
    }
}
