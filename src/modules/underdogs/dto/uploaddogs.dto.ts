import { IsDate, IsEnum, IsNumber, IsString } from 'class-validator';
import { NeuterYn, Sexcd } from 'src/constants/dog/dog.enum';

// 객체지향 프로그래밍의 캡슐화 원칙 -> private
// 필드값을 핸들링하는 메소드를 함께 구현
// 설정자 세터와 접근자 게터로 구성

export class UploadDogsDto {
    @IsString()
    desertionNo: String; // 유기번호 -> (id)

    @IsString()
    processState: String; // 상태 -> (state)

    @IsString()
    popfile: String; // 사진 -> (img_url)

    @IsDate()
    happenDt: Date; // 접수일 -> (date)

    @IsString()
    happenPlace: String; // 발견장소 -> (place)

    @IsString()
    kindCd?: String; // 품종 -> (breeds)

    @IsString()
    colorCd: String; // 색상 -> (color)

    @IsDate()
    age: Number; // 탄생 년도 -> (birth)

    @IsNumber()
    weight: Number; // 체중 -> (weight) (0(미상))

    @IsEnum(Sexcd)
    sexCd: Sexcd; // 성별 -> (sex) (F,M,Q(미상))

    @IsEnum(NeuterYn)
    neuterYn: NeuterYn; // 중성화 여부 -> (neuter) (Y,N,U(미상))

    @IsString()
    specialMark?: String; // 특징 -> (memo)

    @IsString()
    noticeNo: String; // 공고번호 -> (code)

    @IsDate()
    noticeSdt: Date; // 공고시작일 -> (date_start) (YYYYMMDD)

    @IsDate()
    noticeEdt: Date; // 공고종료일 -> (date_end) (YYYYMMDD)

    @IsString()
    careNm: String; // 보호소 이름 -> (name)

    @IsString()
    careTel: String; // 보호소 전화번호 -> (phone)

    @IsString()
    careAddr: String; // 보호소 주소 -> (address)
}
