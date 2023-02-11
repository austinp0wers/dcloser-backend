import { ProposalStatusEnum } from '../enums/proposal.status.enum';
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
import { ApiProperty } from '@nestjs/swagger';
export class SaveProposalDto {
  @ApiProperty()
  @IsString()
  @Length(1, 128)
  customer_company_rep: string;

  // user_id 키로 연결
  @ApiProperty()
  @IsUUID()
  @IsNotEmpty()
  business_user_id: string;

  //customerCompany_id 로 연결
  @ApiProperty()
  @IsInt()
  @IsOptional()
  customer_company_id: number;

  // 이건 enum 으로 처리.
  @ApiProperty()
  @IsString()
  @IsOptional()
  paid_period: string;

  @ApiProperty()
  @IsString()
  total_payment_price: number;

  @ApiProperty()
  @IsDate()
  @IsOptional()
  expire_at: Date;

  @ApiProperty()
  @IsEnum(ProposalStatusEnum)
  @IsOptional()
  readonly status: string;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  business_id: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  proposal_title: string;
}
