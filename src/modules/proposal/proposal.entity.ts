import { SaveProposalDto } from './dtos/saveProposal.dto';
import { UserEntity } from './../user/user.entity';
import { ProposalStatusEnum } from './enums/proposal.status.enum';
import { BusinessEntity } from './../user/business/business.entity';
import {
  Column,
  Entity,
  JoinColumn,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity({ name: 'proposals' })
export class ProposalEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // 견적서ID
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

  @DeleteDateColumn()
  deleted_at: Date;

  static create(saveProposal: SaveProposalDto) {
    const proposal = new ProposalEntity();
    proposal.customer_company_rep = saveProposal.customer_company_rep;
    proposal.customer_company_id = saveProposal.customer_company_id;
    proposal.paid_period = saveProposal.paid_period;
    proposal.total_payment_price = saveProposal.total_payment_price;
    proposal.expire_at = saveProposal.expire_at;
    proposal.business_user_id = saveProposal.business_user_id;
    proposal.status = saveProposal.status;
    proposal.business_id = saveProposal.business_id;
    proposal.proposal_title = saveProposal.proposal_title;

    return proposal;
  }
}
