import {
    Column,
    Entity,
    JoinColumn,
    ManyToMany,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UnderDogs } from './underdog.entity';

@Entity()
export class Breeds {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'varchar', unique: true })
    name: string;

    @Column({ type: 'json', nullable: true })
    charactor: string[];

    @ManyToMany(() => UnderDogs)
    @JoinColumn()
    underdog?: UnderDogs[];
}
