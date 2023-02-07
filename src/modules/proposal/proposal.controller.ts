import { ResSaveProposalDto } from './dtos/response/save.proposal.dto';
import { CustomNotFoundException } from 'src/exceptions/customNotFound.exception';
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
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('proposal')
@ApiTags('proposal')
@UseInterceptors(new ResponseInterceptor())
export class ProposalController {
  constructor(
    private proposalService: ProposalService,
    private readonly mailService: MailService,
  ) {}

  @Get(':proposalId')
  public async getProposalById(@Req() req, @Res() res, @Param() proposalId) {
    const proposalInfo = await this.proposalService.findProposalById(
      Number(proposalId.proposalId),
    );

    res.json({ status: 'success', ...proposalInfo });
  }

  @Post('email')
  public async sendEmailToCustomer(
    @Req() req,
    @Res() res,
    @Body() reqSendToCustomerInfo: ReqSendEmailToCustomerDto,
  ) {
    const { business_id, user_id } = req.user;

    const savedProposal = await this.proposalService.saveProposal(
      reqSendToCustomerInfo.proposalData,
      business_id,
      user_id,
    );
    if (!savedProposal) {
      throw new CustomInternalException('Create proposal failed');
    }
    const result = await this.mailService.sendMail(
      reqSendToCustomerInfo.clientEmail,
      user_id,
      savedProposal.identifiers[0].id,
    );
    if (result.rejected.length >= 1) {
      throw new CustomInternalException('internal server error');
    }
    res.json({ status: 'success', code: 200 });
  }

  @Post('')
  @ApiOkResponse({
    type: ResSaveProposalDto,
    description: 'Successfully Saved',
  })
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
    if (!savedProposal) {
      throw new CustomInternalException('Create Proposal Failed');
    }
    res.json(
      new ResSaveProposalDto({ success: true, code: 200 }, 'Create Successful'),
    );
  }

  @Get('')
  public async getProposalList(@Req() req, @Res() res) {
    // user_id 에서 Business_id 조회
    const business_id = req.user.business_id;
    const getProposals = await this.proposalService.getProposalList(
      business_id,
    );
    res.json({ ...getProposals });
  }

  // @Post('/internal')
  // public async shareProposalInternally() {}
}
