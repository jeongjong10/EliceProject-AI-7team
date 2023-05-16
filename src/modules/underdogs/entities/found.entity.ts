import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UnderDogs } from './underdog.entity';

@Entity()
export class Found {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'date' })
    date: Date; // 접수일(happenDt)

    @Column({ type: 'date' })
    place: String; // 발견장소(happenPlace)

    // OneToOne
    @OneToOne(() => UnderDogs)
    @JoinColumn()
    found: Found;
}
