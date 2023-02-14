import { ApiProperty } from '@nestjs/swagger';
import { GetProposalDto } from './get.proposal.dto';
export class ResGetProposalByIdDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  code: number;

  @ApiProperty()
  proposal: GetProposalDto;
  constructor(code: number, success: boolean, proposal: GetProposalDto) {
    this.success = success;
    this.code = code;
    this.proposal = proposal;
  }
}
