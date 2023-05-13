import { Platform } from 'src/constants/auth/user.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    email: string;

    @Column()
    nickname: string;

    @Column()
    password?: string;

    @Column({ default: true })
    isActive: boolean;

    @Column({ default: false })
    isAdmin: boolean;

    @Column({ default: Platform.YOUIF })
    platform: Platform;

    // @Column()
    // user_detail?: UserDetail;
}
