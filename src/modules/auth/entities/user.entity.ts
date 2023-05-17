import { Platform } from '../../../constants/auth/user.enum';
import {
    Column,
    Entity,
    OneToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
} from 'typeorm';
import { UserDetail } from './userdetail.entity';
import { VisitRequest } from './visitrequest.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'varchar', unique: true })
    email: string;

    @Column({ type: 'varchar' })
    nickname: string;

    @Column({ type: 'varchar', nullable: true })
    password?: string;

    @Column({ type: 'boolean', default: true })
    isActive: boolean;

    @Column({ type: 'boolean', default: false })
    isAdmin: boolean;

    @Column({
        type: 'enum',
        enum: Platform,
        default: Platform.YOUIF,
    })
    platform: Platform;

    // OneToOne
    @OneToOne(() => UserDetail, {
        eager: true, // user 로딩시 user_detail도 자동으로 로드
        orphanedRowAction: 'delete', // user 삭제시 user_detail 삭제
    })
    user_detail?: UserDetail;

    @OneToMany(() => VisitRequest, (visit_request) => visit_request.user)
    visit_request?: VisitRequest;

    @CreateDateColumn({ name: 'created_at' })
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at' })
    updatedAt: Date;
}
