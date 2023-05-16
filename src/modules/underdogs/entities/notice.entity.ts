import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UnderDogs } from './underdog.entity';

@Entity()
export class Notice {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'varchar', unique: true })
    code: String; // 공고번호(noticeNo)

    // OneToOne
    @OneToOne(() => UnderDogs)
    @JoinColumn()
    notice: Notice;

    @Column({ type: 'date' })
    dateStart: Date; // 공고시작일(noticeSdt)

    @Column({ type: 'date' })
    dateEnd: Date; // 공고종료일(noticeEdt)
}
