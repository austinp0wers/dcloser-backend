import { ProposalService } from './proposal.service';
import { Body, Controller, Post, Get, Req, Res } from '@nestjs/common';
@Controller('proposal')
export class ProposalController {
  constructor(private proposalService: ProposalService) {}

  @Post('/')
  public async saveProposal(@Req() req, @Res() res, @Body() proposalBody) {
    this.proposalService.saveProposal(proposalBody);
  }

  @Get('/')
  public async getProposalList(@Req() req, @Res() res) {
    const getProposals = this.proposalService.getProposalList();
    res.json({ ...getProposals });
  }

  @Post('/email')
  public async sendToCustomer() {}

  @Post('/internal')
  public async shareProposalInternally() {}
}
