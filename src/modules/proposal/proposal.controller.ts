import { S3Service } from './../../shared/services/s3.service';
import { ResSaveProposalDto } from './dtos/response/save.proposal.dto';
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
  UploadedFile,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('proposal')
@ApiTags('proposal')
@UseInterceptors(new ResponseInterceptor())
export class ProposalController {
  constructor(
    private proposalService: ProposalService,
    private readonly mailService: MailService,
    private readonly s3Service: S3Service,
  ) {}

  @Get(':proposalId')
  public async getProposalById(@Req() req, @Res() res, @Param() proposalId) {
    const proposalInfo = await this.proposalService.findProposalById(
      Number(proposalId.proposalId),
    );

    res.json({ status: 'success', ...proposalInfo });
  }

  @Post('email')
  @UseInterceptors(FileInterceptor('file'))
  public async sendEmailToCustomer(
    @Req() req,
    @Res() res,
    @Body() reqSendToCustomerInfo: ReqSendEmailToCustomerDto,
    @UploadedFile() file,
  ) {
    const { business_id, business_user_id } = req.user;

    if (typeof reqSendToCustomerInfo.proposalData === 'string') {
      reqSendToCustomerInfo.proposalData = JSON.parse(
        reqSendToCustomerInfo.proposalData,
      );
    }
    const savedProposal = await this.proposalService.saveProposal(
      reqSendToCustomerInfo.proposalData,
      business_id,
      business_user_id,
    );

    await this.s3Service.uploadFile(file, savedProposal.identifiers[0].id);
    if (!savedProposal) {
      throw new CustomInternalException('Create proposal failed');
    }

    const preSignedUrl = this.s3Service.generatePresignedUrl(
      savedProposal.identifiers[0].id,
    );

    const result = await this.mailService.sendRequestMail(
      reqSendToCustomerInfo.clientEmail,
      reqSendToCustomerInfo.proposalData.customer_company_rep,
      business_user_id,
      savedProposal.identifiers[0].id,
      preSignedUrl,
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
    const { business_id, business_user_id } = req.user;

    const savedProposal = await this.proposalService.saveProposal(
      reqCreateProposal,
      business_id,
      business_user_id,
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
    res.json({ success: true, code: 200, getProposals: { ...getProposals } });
  }

  // @Post('/internal')
  // public async shareProposalInternally() {}
}
