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

    // 유기견 전체 목록 조회
    @Get('/')
    getDogsListController(@Res() res, @Query('id') id: String) {
        if (!id) {
            const dogsList: Promise<Dog[]> = this.DogsService.findDogsList();
            res.json({
                message: '유기견 전체 목록 조회 성공',
                data: dogsList,
            });
        } else {
            const dog: Promise<Dog> = this.DogsService.findDog(id);
            res.json({
                message: '특정 유기견 정보 조회 성공',
                data: dog,
            });
        }
    }

    // // 유기견 전체 목록 조회
    // @Get('/')
    // getDogsListController(@Res() res) {
    //     const dogsList: Promise<Dog[]> = this.DogsService.findDogsList();
    //     res.json({
    //         message: '유기견 전체 목록 조회 성공',
    //         data: dogsList,
    //     });
    // }

    // // 특정(id) 유기견 정보 조회
    // @Get('/:id')
    // getDogController(@Res() res, @Query('id') id: String) {
    //     const dog: Promise<Dog> = this.DogsService.findDog(id);
    //     res.json({
    //         message: '특정 유기견 정보 조회 성공',
    //         data: dog,
    //     });
    // }

    // 사용자 입력 정보 기반 유기견 정보 조회
    @Post()
    findDogController(@Body() findDog: FindDogDto, @Res() res) {
        const foundedDog: Promise<Dog[]> = this.DogsService.findMany(findDog);
        res.json({
            message: '사용자 조건에 맞는 유기견 정보 조회 성공',
            data: foundedDog,
        });
    }

    // 유기견 데이터 입력 (Flask -> Nest)
    @Post('upload')
    uploadDataController(@Body() createDogData: CreateDogDto[], @Res() res) {
        console.log('Controller : ', createDogData);
        const createdDog = this.DogsService.createMany(createDogData);
        res.json({
            message: '유기견 데이터 입력 성공',
            data: createdDog,
        });
    }
}
