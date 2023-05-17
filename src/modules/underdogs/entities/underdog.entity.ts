import { NeuterYn, Sexcd } from '../../../constants/dog/dog.enum';
import { VisitRequest } from '../../auth/entities/visitrequest.entity';
import {
    Column,
    Entity,
    Index,
    JoinColumn,
    JoinTable,
    ManyToMany,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryColumn,
} from 'typeorm';
import { CareCeter } from './carecenter.entity';
import { Notice } from './notice.entity';
import { Breeds } from './breeds.entity';

@Entity({
    orderBy: { found_date: 'DESC' }, // 항상 오래된 순으로 검색
})
export class UnderDogs {
    @PrimaryColumn({ type: 'varchar' })
    id: String; // 유기번호(desertionNo)

    @Column({ type: 'varchar' })
    state: String; // 상태(processState)

    @Column({ type: 'varchar' })
    img_url: String; // 사진(popfile)

    @Column({ type: 'date' })
    found_date: Date; // 접수일(happenDt)

    @Column({ type: 'date' })
    found_place: String; // 발견장소(happenPlace)

    // ManyToMany ,Index
    @ManyToMany(() => Breeds, (breeds) => breeds.underdog, {
        eager: true,
    })
    @JoinTable({
        name: 'DogBreeds',
        joinColumn: {
            name: 'underdog_id',
            referencedColumnName: 'id',
        },
        inverseJoinColumn: {
            name: 'breeds_id',
            referencedColumnName: 'id',
        },
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
    @OneToMany(() => VisitRequest, (visit_request) => visit_request.id, {
        nullable: true,
    })
    @JoinColumn()
    // joincolumn 데코레이터를 넣으면 , 데이터 호출시 relation 옵션을 사용해 조인이 가능
    visit_request?: VisitRequest;
}
