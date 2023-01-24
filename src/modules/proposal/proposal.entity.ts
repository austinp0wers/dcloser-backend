import { UserEntity } from './../user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'proposals' })
export class ProposalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: String, nullable: true })
  customerCompanyRep: string;

  @Column({ array: true, default: [] })
  productList: string;

  @OneToMany(() => UserEntity, (userEntity) => userEntity.id)
  @JoinColumn({ name: 'user_id' })
  user_id: UserEntity[];

  @Column({})
  customerCompanyId: string;

  @Column({ type: String, nullable: true })
  paidPeriod: string;

  @Column({ type: Number, nullable: true })
  totalPaymentPrice: number;

  @Column({ type: String, nullable: true })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
