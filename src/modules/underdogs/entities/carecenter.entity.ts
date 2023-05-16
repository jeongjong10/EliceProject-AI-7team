import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UnderDogs } from './underdog.entity';

@Entity()
export class CareCeter {
    @PrimaryGeneratedColumn({ type: 'int' })
    id: number;

    @Column({ type: 'varchar', unique: true })
    name: String; // 보호소 이름(careNm)

    @Column({ type: 'varchar', nullable: true })
    phone?: String; // 보호소 전화번호(careTel)

    @Column({ type: 'varchar', nullable: true })
    address: String; // 보호소 주소(careAddr)

    // OneToMany
    @OneToMany(() => UnderDogs, (underdog) => underdog.carecenter)
    underdogs: UnderDogs[];
}
