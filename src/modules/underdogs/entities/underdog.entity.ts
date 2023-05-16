import { NeuterYn, Sexcd } from 'src/constants/dog/dog';
import { VisitRequest } from 'src/modules/auth/entities/visitrequest.entity';
import {
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
} from 'typeorm';
import { CareCeter } from './carecenter.entity';
import { Notice } from './notice.entity';
import { Found } from './found.entity';
import { Breeds } from './breeds.entity';

@Entity({
    orderBy: {},
})
export class UnderDogs {
    @PrimaryColumn({ type: 'varchar' })
    id: String; // 유기번호(desertionNo)

    @Column({ type: 'varchar' })
    state: String; // 상태(processState)

    @Column({ type: 'varchar' })
    img_url: String; // 사진(popfile)

    // OneToOne
    @OneToOne(() => Found, {
        eager: true, // user 로딩시 user_detail도 자동으로 로드
        orphanedRowAction: 'delete', // user 삭제시 user_detail 삭제
    })
    found: Found;

    // ManyToMany
    @ManyToMany(() => Breeds, {
        eager: true, // user 로딩시 user_detail도 자동으로 로드
    })
    breeds?: Breeds[];

    @Column({ type: 'varchar' })
    color: String; // 색상(colorCd)

    @Column({ type: 'int' })
    birth: Number; // 탄생 년도(age)

    @Column({ type: 'int' })
    weight: Number; // 체중(weight) (0(미상))

    @Column({ type: 'enum', enum: Sexcd })
    sex: Sexcd; // 성별(sexCd) (F,M,Q(미상))

    @Column({ type: 'enum', enum: NeuterYn })
    neuter: NeuterYn; // 중성화 여부(neuterYn) (Y,N,U(미상))

    @Column({ type: 'varchar' })
    memo?: String; // 특징(specialMark)

    // OneToOne
    @OneToOne(() => Notice, {
        eager: true,
        orphanedRowAction: 'delete',
    })
    notice: Notice;

    // ManyToOne
    @ManyToOne(() => CareCeter, (carecenter) => carecenter.underdogs, {
        eager: true,
    })
    carecenter: CareCeter;

    //OneToMany
    @OneToMany(() => VisitRequest, (visit_request) => visit_request.id)
    @JoinColumn()
    // joincolumn 데코레이터를 넣으면 , 데이터 호출시 relation 옵션을 사용해 조인이 가능
    visit_request: VisitRequest;
}
