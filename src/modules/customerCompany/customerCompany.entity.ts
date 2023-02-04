import { BusinessEntity } from './../user/business/business.entity';
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
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'customerCompany' })
export class CustomerCompanyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: String })
  name: string;

  // business entity의 id랑 join.
  @ManyToOne(() => BusinessEntity)
  @JoinColumn({ name: 'business' })
  business: BusinessEntity;

  @Column({ type: Number, nullable: false })
  business_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
