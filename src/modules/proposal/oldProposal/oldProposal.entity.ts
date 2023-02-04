import { ProposalEntity } from './../proposal.entity';
import { ProposalStatusEnum } from './../enums/proposal.status.enum';
import { UserEntity } from './../../user/user.entity';
import { BusinessEntity } from './../../user/business/business.entity';
import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  OneToOne,
} from 'typeorm';

@Entity({ name: 'old_proposals' })
export class OldProposalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProposalEntity, (proposalEntity) => proposalEntity.id)
  @JoinColumn({ name: 'proposal' })
  proposal: number;

  @Column({ type: Number, nullable: false })
  proposal_id: number;

  @Column({ type: String, nullable: false })
  proposal_title: string;

  @Column({ type: String, nullable: true })
  customer_company_rep: string;

  @ManyToOne(() => BusinessEntity, (businessEntity) => businessEntity.id)
  @JoinColumn({ name: 'business' })
  business: number;

  @Column({ type: Number, nullable: false })
  business_id: number;

  @OneToOne(() => UserEntity, (userEntity) => userEntity.id)
  @JoinColumn({ name: 'business_user' })
  business_user: string;

  @Column({ type: String, nullable: false })
  business_user_id: string;

  @Column({ type: Number, nullable: true })
  customer_company_id: number;

  @Column({ type: String, nullable: true })
  paid_period: string;

  @Column({ type: Number, nullable: true })
  total_payment_price: number;

  @Column({
    type: 'enum',
    enum: ProposalStatusEnum,
    default: ProposalStatusEnum.DRAFT,
  })
  status: string;

  @Column({ type: Date, nullable: true })
  expire_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
