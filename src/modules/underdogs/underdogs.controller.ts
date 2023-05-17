import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { UnderdogsService } from './underdogs.service';
import { PagenationDogDto } from './dto/pagenationdog.dto';
import { SearchDogListDto } from './dto/searchdoglist.dto';
import { UnderDogs } from './entities/underdog.entity';
import { UploadDogsDto } from './dto/uploaddogs.dto';

@Controller('underdogs')
export class UnderdogsController {
    constructor(private readonly service: UnderdogsService) {}

    @Get('/')
    getDogsList(@Res() res, @Query() pagenationDogDto: PagenationDogDto) {
        this.service
            .findDogsList(pagenationDogDto)
            .then((dogsList: UnderDogs[]) => {
                res.json({
                    message: `(전체 목록) 유기견 ${pagenationDogDto.limit}개 조회 성공`,
                    data: dogsList,
                });
            })
            .catch((err) => {
                res.json({
                    message: err,
                });
            });
    }

    @Get('/search')
    async searchDogsList(searchDogListDto: SearchDogListDto) {
        const searchedDogsList: UnderDogs[] = await this.service.searchDogsList(
            searchDogListDto
        );
        return {
            message: `(사용자 검색) 유기견 조회 성공`,
            data: searchedDogsList,
        };
    }

    @Get('/:id')
    getDogOne(@Res() res, @Param('id') id: String) {
        this.service
            .getDogOne(id)
            .then((dog: UnderDogs) => {
                res.json({
                    message: '특정 유기견 정보 조회 성공',
                    data: dog,
                });
            })
            .catch((err) => {
                res.json({
                    message: err,
                });
            });
    }

    @Post('upload')
    uploadDogsData(@Body() uploadDogsData: UploadDogsDto[], @Res() res) {
        this.service
            .createDogsMany(uploadDogsData)
            .then((newDogs: UnderDogs[]) => {
                res.json({
                    message: '유기견 데이터 입력 성공',
                    data: newDogs,
                });
            })
            .catch((err) => {
                res.json({ message: err });
            });
    }
}
