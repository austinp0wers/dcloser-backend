import { ApiProperty } from '@nestjs/swagger';
import { ProposalInfoDto } from './../proposal.info.dto';
export class ResGetProposalListDto {
  @ApiProperty()
  success: boolean;
  @ApiProperty()
  code: number;
  @ApiProperty()
  getProposals: [ProposalInfoDto];
  constructor(success: boolean, code: number, getProposals: [ProposalInfoDto]) {
    this.success = success;
    this.code = code;
    this.getProposals = getProposals;
  }
}
