import { CustomInternalException } from './../../exceptions/customInternal.exception';
import { ReqSendEmailToCustomerDto } from './dtos/request/send.email.to.customer.dto';
import { MailService } from './mail/mail.service';
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
  Param,
} from '@nestjs/common';

@Controller('proposal')
@UseInterceptors(new ResponseInterceptor())
export class ProposalController {
  constructor(
    private proposalService: ProposalService,
    private readonly mailService: MailService,
  ) {}
  @Get('/')
  public async getProposalList(@Req() req, @Res() res) {
    // user_id 에서 Business_id 조회
    const business_id = req.user.business_id;
    const getProposals = await this.proposalService.getProposalList(
      business_id,
    );
    res.json({ ...getProposals });
  }

  @Get('/:proposalId')
  public async getProposalById(@Req() req, @Res() res, @Param() proposalId) {
    // proposalId 내용 조회
    console.log('proposalId', proposalId.proposalId);
    const proposalInfo = await this.proposalService.findProposalById(
      Number(proposalId.proposalId),
    );
    console.log('proposalInfo', proposalInfo);
    res.json({ status: 'success', ...proposalInfo });
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
  public async sendEmailToCustomer(
    @Req() req,
    @Res() res,
    @Body() reqSendToCustomerInfo: ReqSendEmailToCustomerDto,
  ) {
    const { business_id, user_id } = req.user;

    const savedProposal = await this.proposalService.saveProposal(
      reqSendToCustomerInfo.reqCreateProposal,
      business_id,
      user_id,
    );

    console.log('savedProposal', savedProposal);
    const result = await this.mailService.sendMail(
      reqSendToCustomerInfo.clientEmail,
    );
    if (result.rejected.length >= 1) {
      throw new CustomInternalException('internal server error');
    }

    res.json({ status: 'success', code: 200 });
  }

  // @Post('/internal')
  // public async shareProposalInternally() {}
}
