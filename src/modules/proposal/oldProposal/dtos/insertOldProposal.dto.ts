import { ProposalStatusEnum } from './../../enums/proposal.status.enum';
import {
  IsString,
  Length,
  IsEnum,
  IsUUID,
  IsInt,
  IsOptional,
  IsNotEmpty,
  IsDate,
} from 'class-validator';
export class InsertOldProposalDto {
  @IsInt()
  @IsOptional()
  proposal_id: number;

  @IsString()
  @Length(1, 128)
  customer_company_rep: string;

  // user_id 키로 연결
  @IsUUID()
  @IsNotEmpty()
  business_user_id: string;

  //customerCompany_id 로 연결
  @IsInt()
  @IsOptional()
  customer_company_id: number;

  // 이건 enum 으로 처리.
  @IsString()
  @IsOptional()
  paid_period: string;

  @IsString()
  total_payment_price: number;

  @IsDate()
  @IsOptional()
  expire_at: Date;

  @IsEnum(ProposalStatusEnum)
  @IsOptional()
  readonly status: string;

  @IsInt()
  @IsNotEmpty()
  business_id: number;

  @IsString()
  @IsNotEmpty()
  proposal_title: string;
}
