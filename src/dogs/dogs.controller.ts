import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';

// 컨트롤러 파일 (라우터)

// 컨트롤러 데코레이터 : 라우팅 경로 매핑
@Controller('underdogs')
export class DogsController {
    constructor(private readonly DogsService: DogsService) {}

    @Get('upload')
    uploadTest(@Res() res) {
        console.log('컨트롤러 들어옴');
        res.json({ message: '성공' });
    }

    // http 메서드 데코레이터
    @Post('upload') // 패스 매핑 가능
    uploadData(@Body() createDogData: CreateDogDto, @Res() res) {
        console.log(createDogData);
        const createdDog = this.DogsService.create(createDogData);
        res.json({
            message: '유기견 데이터 입력 성공',
            data: createdDog,
        });
    }
}
