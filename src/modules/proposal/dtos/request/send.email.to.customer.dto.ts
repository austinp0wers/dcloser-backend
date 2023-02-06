import { ApiProperty } from '@nestjs/swagger';
import { ReqCreateProposalDto } from './create.request.proposal.dto';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class ReqSendEmailToCustomerDto {
  //   @Transform(({ value }) => trimPipe(value))
  @ApiProperty()
  @IsNotEmpty()
  @IsString({ each: true })
  @IsArray()
  readonly clientEmail: string[];

  @ApiProperty()
  @IsNotEmpty()
  proposalData: ReqCreateProposalDto;
}
