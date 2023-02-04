import { ProposalStatusEnum } from './../../enums/proposal.status.enum';
import {
  IsString,
  Length,
  IsEnum,
  IsInt,
  IsOptional,
  IsNotEmpty,
  IsArray,
  IsDate,
} from 'class-validator';
export class ReqCreateProposalDto {
  @IsInt()
  @IsOptional()
  id: number;

  @IsString()
  //   @Length(1, 128)
  @IsOptional()
  customer_company_rep: string;

  @IsString()
  @Length(1, 128)
  proposal_title: string;

  //customerCompany_id 로 연결
  @IsInt()
  @IsOptional()
  customer_company_id: number;

  // 이건 enum 으로 처리.
  @IsString()
  @IsOptional()
  paid_period: string;

  @IsInt()
  @IsOptional()
  total_payment_price: number;

  @IsDate()
  @IsOptional()
  expire_at: Date;

  @IsEnum(ProposalStatusEnum)
  @IsOptional()
  readonly status: string;

  @IsArray()
  @IsNotEmpty()
  products_id: number[];
}
