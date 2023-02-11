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
  MaxLength,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class ReqCreateProposalDto {
  @ApiProperty({ maxLength: 128 })
  @IsString()
  @MaxLength(128)
  @IsOptional()
  customer_company_rep: string;

  @ApiProperty()
  @IsString()
  @Length(1, 128)
  proposal_title: string;

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
  @IsInt()
  @IsOptional()
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
  @IsArray()
  @IsNumber({}, { each: true })
  @IsNotEmpty()
  products_id: number[];
}
