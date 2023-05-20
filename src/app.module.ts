import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DogsModule } from './modules/dogs/dogs.module';
import { CacheModule } from '@nestjs/cache-manager';
// 응용 프로그램의 루트 모듈
// 데코레이터 : 클래스를 필수 메타데이터와 연결하고, 라우팅 맵을 만들게 한다.

// 모듈 데코레이터
@Module({
    // 구현한 모듈 등록
    imports: [
        // 환경변수 적용 모듈 추가
        ConfigModule.forRoot({
            isGlobal: true,
            cache: true,
        }),

        // 인메모리 캐시
        CacheModule.register({
            isGlobal: true,
        }),

        // MongoDB 연결 모듈
        MongooseModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: async (config: ConfigService) => ({
                uri: config.get('MONGODB_ADDRESS'),
            }),
            inject: [ConfigService],
        }),

        // 생성한 모듈 추가
        DogsModule,
    ],

    // 현재 모듈에서 구현한 컨트롤러 등록
    controllers: [],

    // 현재 모듈에서 구현된 서비스 등록
    providers: [],

    // 현재 모듈의 구성품을 다른 모듈에서 사용하고자 할때, 구성품 명시
    exports: [],
})
export class AppModule {} // 모듈을 클래스화해서 익스포트
