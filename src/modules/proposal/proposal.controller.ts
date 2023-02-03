import { ResponseInterceptor } from './../../interceptors/response.interceptor';
import { ReqCreateProposalDto } from './dtos/request/create.request.proposal.dto';
import { ProposalService } from './proposal.service';
import {
  Body,
  Controller,
  Post,
  Get,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
@Controller('proposal')
@UseInterceptors(new ResponseInterceptor())
export class ProposalController {
  constructor(private proposalService: ProposalService) {}
  @Get('/')
  public async getProposalList(@Req() req, @Res() res) {
    // user_id 에서 Business_id 조회
    const business_id = req.user.business_id;
    const getProposals = await this.proposalService.getProposalList(
      business_id,
    );
    res.json({ ...getProposals });
  }

  @Post('/')
  public async saveProposal(
    @Req() req,
    @Res() res,
    @Body() reqCreateProposal: ReqCreateProposalDto,
  ) {
    const { business_id, user_id } = req.user;
    const savedProposal = await this.proposalService.saveProposal(
      reqCreateProposal,
      business_id,
      user_id,
    );
    res.json({ savedProposal });
  }

  @Post('/email')
  public async sendToCustomer() {}

  @Post('/internal')
  public async shareProposalInternally() {}
}
