import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DogsService } from './dogs.service';
import { DogsController } from './dogs.controller';
import { Dog, DogSchema } from './models/dog.schema';

// 구현하고 사용하는 모듈(API)들을 등록 한다. (의존성 주입)
// 데코레이터 : 클래스를 필수 메타데이터와 연결하고, 라우팅 맵을 만들게 한다.

// 모듈 데코레이터의 imports '배열'에 생성한 모듈을 등록한다.
// 모듈 데코레이터
@Module({
    // imports -> 구현한 모듈 등록
    imports: [
        MongooseModule.forFeature([
            {
                name: Dog.name,
                schema: DogSchema,
            },
        ]),
    ],
    // 현재 모듈에서 구현한 컨트롤러 등록
    controllers: [DogsController],

    // 현재 모듈에서 구현한 서비스 등록
    providers: [DogsService],

    // 현재 모듈의 구성품을 다른 모듈에서 사용하고자 할때, 구성품 명시
    exports: [DogsModule],
})
// 모듈을 클래스화해서 익스포트
export class DogsModule {}
