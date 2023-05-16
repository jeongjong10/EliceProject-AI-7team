import { Employed, Hasdog } from 'src/constants/auth/user.enum';
import {
    Column,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserDetail {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'varchar' })
    name: String;

    @Column({ type: 'varchar' })
    phone: String;

    @Column({ type: 'enum', enum: Employed })
    employed: Employed;

    @Column({ type: 'enum', enum: Hasdog })
    has_dog: Hasdog;

    // OneToOne
    @OneToOne(() => User)
    @JoinColumn()
    user_detail?: UserDetail;
}
