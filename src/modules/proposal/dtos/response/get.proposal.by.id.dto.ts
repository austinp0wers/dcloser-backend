import { ApiProperty } from '@nestjs/swagger';
import { IGetProposalById } from './../../interfaces/response/get.proposal.by.id.interface';
export class ResGetProposalByIdDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  code: number;

  @ApiProperty()
  proposal: IGetProposalById;
  constructor(code: number, success: boolean, proposal: IGetProposalById) {
    this.success = success;
    this.code = code;
    this.proposal = proposal;
  }
}
