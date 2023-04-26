import { Controller, Get, Post, Body, Res } from '@nestjs/common';
import { DogsService } from './dogs.service';

// 컨트롤러 파일 (라우터)

// 컨트롤러 데코레이터 : 라우팅 경로 매핑
@Controller('underdogs')
export class DogsController {
    constructor(private readonly DogsService: DogsService) {}

    @Get()
    uploadTest(@Res() res) {
        res.json({ message: '성공' });
    }

    // http 메서드 데코레이터
    @Post('upload') // 패스 매핑 가능
    uploadData(@Body() data: any): any {
        return this.DogsService.create(data);
    }
}
