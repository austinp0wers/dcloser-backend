import { BusinessEntity } from './business/business.entity';
import { UserRoleEnum } from './enums/role.enum';
import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcryptjs';
@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, nullable: false })
  name: string;

  @Column({ nullable: false, unique: true })
  email: string;

  @ManyToOne(() => BusinessEntity)
  @JoinColumn({ name: 'business' })
  business: number;

  @Column({ type: Number, nullable: false })
  business_id: number;

  @Column({ unique: true, nullable: false })
  phone: string;

  @Column({ nullable: false })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ nullable: true })
  role: UserRoleEnum;

  @BeforeInsert()
  async setPassword() {
    const salt = bcrypt.genSaltSync(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  @Column({ type: String, nullable: true, default: 'pending' })
  verified_status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
