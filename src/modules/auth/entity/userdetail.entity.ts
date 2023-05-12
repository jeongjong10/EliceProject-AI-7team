import { Employed, HASDOG } from 'src/constants/auth/user.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserDetail {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: User.id;

    @Column()
    name: String;

    @Column()
    phone: String;

    @Column()
    employed: Employed;

    @Column()
    has_dog: HASDOG;
}
