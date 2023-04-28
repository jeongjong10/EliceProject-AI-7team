// 객체지향 프로그래밍의 캡슐화 원칙 -> private
// 필드값을 핸들링하는 메소드를 함께 구현
// 설정자 세터와 접근자 게터로 구성

export class CreateDogDto {
    private readonly desertionNo: String; // 유기번호 -> (id)
    private readonly protectState: String; // 상태 -> (state)
    private readonly popfile: String; // 사진 -> (img_url)
    private readonly happenDt: Date; // 접수일 -> (date)
    private readonly happenPlace: String; // 발견장소 -> (place)
    private readonly kindCd?: String; // 품종 -> (breeds)
    private readonly colorCd: String; // 색상 -> (color)
    private readonly age: Date; // 탄생 년도 -> (birth)
    private readonly weight: Number; // 체중 -> (weight) (0(미상))
    private readonly sexCd: String; // 성별 -> (sex) (F,M,Q(미상))
    private readonly neuterYn: String; // 중성화 여부 -> (neuter) (Y,N,U(미상))
    private readonly specialMark?: String; // 특징 -> (memo)
    private readonly noticeNo: String; // 공고번호 -> (code)
    private readonly noticeSdt: Date; // 공고시작일 -> (date_start) (YYYYMMDD)
    private readonly noticeEdt: Date; // 공고종료일 -> (date_end) (YYYYMMDD)
    private readonly careNm: String; // 보호소 이름 -> (name)
    private readonly careTel: String; // 보호소 전화번호 -> (phone)
    private readonly careAddr: String; // 보호소 주소 -> (address)

    //게터 메서드 추가
    getDesertionNo(): String {
        return this.desertionNo;
    }
    getProtectState(): String {
        return this.protectState;
    }
    getPopfile(): String {
        return this.popfile;
    }
    getHappenDt(): Date {
        return this.happenDt;
    }
    getHappenPlace(): String {
        return this.happenPlace;
    }
    getKindCd(): String | undefined {
        return this.kindCd;
    }
    getColorCd(): String {
        return this.colorCd;
    }
    getAge(): Date {
        return this.age;
    }
    getWeight(): Number {
        return this.weight;
    }
    getSexCd(): String {
        return this.sexCd;
    }
    getNeuterYn(): String {
        return this.neuterYn;
    }
    getSpecialMark(): String | undefined {
        return this.specialMark;
    }
    getNoticeNo(): String {
        return this.noticeNo;
    }
    getNoticeSdt(): Date {
        return this.noticeSdt;
    }
    getNoticeEdt(): Date {
        return this.noticeEdt;
    }
    getCareNm(): String {
        return this.careNm;
    }
    getCareTel(): String {
        return this.careTel;
    }
    getCareAddr(): String {
        return this.careAddr;
    }
}
