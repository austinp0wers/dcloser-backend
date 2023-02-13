import { ProposalStatusEnum } from './../../enums/proposal.status.enum';

export interface IGetProposalById {
  id: number;
  proposal_title: string;
  customer_company_rep: string;
  business_id: number;
  business_user_id: string;
  customer_company_id: number;
  paid_period: string;
  total_payment_price: number;
  status: ProposalStatusEnum;
  expire_at: Date;
  created_at: Date;
  deleted_at: Date;
  customer_company_name: string;
}
