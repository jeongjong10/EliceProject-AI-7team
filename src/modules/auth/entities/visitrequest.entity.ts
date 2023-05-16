import { State } from 'src/constants/dog/dog';
import {
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { UnderDogs } from 'src/modules/underdogs/entities/underdog.entity';

@Entity()
export class VisitRequest {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    // ManyToOne
    @ManyToOne(() => User, (user) => user.visit_request)
    user: User;

    // ManyToOne
    @ManyToOne(() => UnderDogs, (underdog) => underdog.visit_request)
    underdog: UnderDogs;

    @Column({ type: 'date' })
    whenDay?: Date;

    @Column({ type: 'varchar' })
    whenTime?: string;

    @Column({
        type: 'enum',
        enum: State,
        default: State.SUBMITTED,
    })
    state: State;

    @Column({ type: 'boolean', default: 'true' })
    isActive: boolean;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
