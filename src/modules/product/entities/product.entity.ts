import { BusinessEntity } from '../../user/business/business.entity';
import { UserEntity } from '../../user/user.entity';
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

@Entity({ name: 'products' })
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => UserEntity, (userEntity) => userEntity.id)
  @JoinColumn({ name: 'user_id' })
  user_id: UserEntity[];

  @Column({ nullable: true, type: String })
  name: string;

  // business entity의 id랑 join.
  @ManyToOne(() => BusinessEntity)
  @JoinColumn({ name: 'business_id' })
  businessId: BusinessEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
