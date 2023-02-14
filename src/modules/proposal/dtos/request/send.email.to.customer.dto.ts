import { ApiProperty } from '@nestjs/swagger';
import { ReqCreateProposalDto } from './create.request.proposal.dto';
import {
  IsString,
  IsNotEmpty,
  IsArray,
  ValidateNested,
  IsNotEmptyObject,
  IsOptional,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class ReqSendEmailToCustomerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString({ each: true })
  @IsArray()
  readonly clientEmail: string[];

  // @Transform(({ value }) => JSON.parse(value))
  @ApiProperty()
  // @IsNotEmptyObject()
  // @ValidateNested()
  // @Type(() => ReqCreateProposalDto)
  @IsNotEmpty()
  proposalData: ReqCreateProposalDto;
}
