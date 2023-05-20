import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type DogDocument = HydratedDocument<Dog>;

// 스케마 정의 데코레이터
@Schema({ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })
export class Dog {
    // 스케마의 property 정의 데코레이터
    @Prop({ required: true })
    id: String; // 유기번호(desertionNo)

    @Prop({ required: true })
    state: String; // 상태(processState)

    @Prop({ required: true })
    img_url: String; // 사진(popfile)

    @Prop({
        required: true,
        type: Object,
    })
    found: {
        date: Date; // 접수일(happenDt)
        place: String; // 발견장소(happenPlace)
    };

    // // DogBreeds 타입의 breeds 값을 여러개 가지기 위한 정의, 인공지능 모델의 반환값 저장 예정
    @Prop({
        index: true,
        required: false,
    })
    breeds?: String[];

    @Prop({ required: true })
    color: String; // 색상(colorCd)

    @Prop({ required: true })
    birth: Number; // 탄생 년도(age)

    @Prop({ required: true })
    weight: Number; // 체중(weight) (0(미상))

    @Prop({ required: true })
    sex: String; // 성별(sexCd) (F,M,Q(미상))

    @Prop({ required: true })
    neuter: String; // 중성화 여부(neuterYn) (Y,N,U(미상))

    @Prop({ required: false })
    memo?: String; // 특징(specialMark)

    @Prop({
        required: true,
        type: Object,
    })
    notice: {
        code: String; // 공고번호(noticeNo)
        date_start: Date; // 공고시작일(noticeSdt)
        date_end: Date; // 공고종료일(noticeEdt)
    };

    @Prop({
        required: true,
        type: Object,
    })
    careCenter: {
        name: String; // 보호소 이름(careNm)
        phone: String; // 보호소 전화번호(careTel)
        address: String; // 보호소 주소(careAddr)
    };
}

// 스케마 펙토리의 createForClass()메서드를 사용하여,
// Dog 클래스에 대한 몽구스 스키마를 생성하고, DogSchema에 할당한다.
export const DogSchema = SchemaFactory.createForClass(Dog);
