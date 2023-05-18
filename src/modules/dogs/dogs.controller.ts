import { Controller, Get, Post, Body, Res, Param, Query } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { Dog } from './models/dog.schema';
import { SearchDogListDto } from './dto/search-doglist.dto';
import { PagenationDogDto } from './dto/pagenation-dog.dto';

// 컨트롤러 파일 (라우터)

// 컨트롤러 데코레이터 : 라우팅 경로 매핑
@Controller('underdogs')
export class DogsController {
    constructor(private readonly DogsService: DogsService) {}

    // 유기견 전체 목록 조회
    @Get('/')
    async getDogListController(
        @Res() res,
        @Query() pagenationDogDto: PagenationDogDto
    ) {
        // (then, cathch문 사용)
        this.DogsService.findDogsList(pagenationDogDto)
            .then((dogList) =>
                res.json({
                    message: `(전체 목록) 유기견 ${pagenationDogDto.limit}개 조회 성공`,
                    data: dogList,
                })
            )
            .catch((err) => {
                res.json(err);
            });
    }

    // 사용자 이미지 검색 유기견 목록 조회 (성별로 전환)
    @Get('/search')
    async searchDogListController(@Query() searchDogListDto: SearchDogListDto) {
        // 리턴문으로 반환
        console.log(searchDogListDto);
        const searchedDogList = await this.DogsService.searchDogList(
            searchDogListDto
        );
        return {
            message: `(사용자 검색) 유기견 조회 성공`,
            data: searchedDogList,
        };
    }

    // 특정 유기견 id 검색 및 조회
    @Get('/:id')
    async getDogController(@Res() res, @Param('id') dog_id: String) {
        // res로 반환
        const dog: Dog = await this.DogsService.findDog(dog_id);
        res.json({
            message: '특정 유기견 정보 조회 성공',
            data: dog,
        });
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
