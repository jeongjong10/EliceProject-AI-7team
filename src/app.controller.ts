import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// 컨트롤러 파일 (라우터)

// 컨트롤러 데코레이터 : 라우팅 경로 매핑
@Controller()
// 클래스로 패킹
export class AppController {
    constructor(private readonly appService: AppService) {}
    // 컨스트럭터, 생성자 :

    // http 메서드 데코레이터
    @Get() // 패스 매핑 가능
    getHello(): string {
        return this.appService.getHello();
    }
}
