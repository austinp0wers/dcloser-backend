import { BusinessEntity } from './../user/business/business.entity';
import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';

@Entity({ name: 'customer_company' })
export class CustomerCompanyEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true, type: String })
  name: string;

  @Column({ type: Number, nullable: false })
  business_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
