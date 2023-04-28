import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DogsModule } from './dogs/dogs.module';
import * as dotenv from 'dotenv';
dotenv.config();

// 응용 프로그램의 루트 모듈
// app.js 와 같은 메인 파일로써, 프로그램의 시작점이다.
// 구현하고 사용하는 모듈(API)들을 등록 한다. (의존성 주입)
// 데코레이터 : 클래스를 필수 메타데이터와 연결하고, 라우팅 맵을 만들게 한다.

// 모듈 데코레이터의 imports '배열'에 생성한 모듈을 등록한다.
// 모듈 데코레이터
@Module({
    // 구현한 모듈 등록
    imports: [
        // MongoDB 연결 모듈
        MongooseModule.forRoot(process.env.MONGODB_ADDRESS),
        // 생성 모듈 추가
        DogsModule,
    ],

    // 현재 모듈에서 구현한 컨트롤러 등록
    controllers: [AppController],

    // 현재 모듈에서 구현된 서비스 등록
    providers: [AppService],

    // 현재 모듈의 구성품을 다른 모듈에서 사용하고자 할때, 구성품 명시
    exports: [],
})
export class AppModule {} // 모듈을 클래스화해서 익스포트
