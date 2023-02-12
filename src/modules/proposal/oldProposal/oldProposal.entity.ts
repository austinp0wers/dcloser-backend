import { ProposalStatusEnum } from './../enums/proposal.status.enum';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity({ name: 'old_proposals' })
export class OldProposalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: Number, nullable: false })
  proposal_id: number;

  @Column({ type: String, nullable: false })
  proposal_title: string;

  @Column({ type: String, nullable: true })
  customer_company_rep: string;

  @Column({ type: Number, nullable: false })
  business_id: number;

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
