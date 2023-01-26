import { ProposalEntity } from './../../proposal/proposal.entity';
import { ProductEntity } from './product.entity';
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

@Entity({ name: 'productOfferedLogs' })
export class ProductOfferedLogsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.id)
  @JoinColumn({ name: 'user_id' })
  user_id: UserEntity;

  // business entity의 id랑 join.
  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'business_id' })
  product_id: ProductEntity[];

  @ManyToOne(() => ProposalEntity)
  @JoinColumn({ name: 'proposal_id' })
  proposal_id: ProposalEntity;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
