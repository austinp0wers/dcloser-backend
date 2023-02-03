import { ProposalEntity } from '../../proposal/proposal.entity';
import { ProductEntity } from '../entities/product.entity';
import { UserEntity } from '../../user/user.entity';
import {
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Column,
} from 'typeorm';

@Entity({ name: 'products_offered' })
export class ProductsOfferedEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // business entity의 id랑 join.
  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'products' })
  products: ProductEntity;

  @Column({ type: Number, nullable: false })
  products_id: number;

  @ManyToOne(() => ProposalEntity)
  @JoinColumn({ name: 'proposal' })
  proposal: ProposalEntity;

  @Column({ type: Number, nullable: false })
  proposal_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;
}
