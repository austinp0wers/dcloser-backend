import { ProposalStatusEnum } from './../../enums/proposal.status.enum';
import { ApiProperty } from '@nestjs/swagger';

export class GetProposalDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  proposal_title: string;

  @ApiProperty()
  customer_company_rep: string;

  @ApiProperty()
  business_id: number;

  @ApiProperty()
  business_user_id: string;

  @ApiProperty()
  customer_company_id: number;

  @ApiProperty()
  paid_period: string;

  @ApiProperty()
  total_payment_price: number;

  @ApiProperty()
  status: ProposalStatusEnum;

  @ApiProperty()
  expire_at: Date;

  @ApiProperty()
  created_at: Date;

  @ApiProperty()
  customer_company_name: string;
}
