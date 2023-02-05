import { ReqCreateProposalDto } from './create.request.proposal.dto';
import { IsString, IsNotEmpty, IsArray } from 'class-validator';

export class ReqSendEmailToCustomerDto {
  //   @Transform(({ value }) => trimPipe(value))
  @IsNotEmpty()
  @IsString({ each: true })
  @IsArray()
  readonly clientEmail: string[];

  @IsNotEmpty()
  proposalData: ReqCreateProposalDto;
}
