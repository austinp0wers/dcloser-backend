import { ResGetProposalByIdDto } from './dtos/response/get.proposal.by.id.dto';
import { UserService } from './../user/user.service';
import { BusinessService } from './../user/business/business.service';
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
    private readonly businessService: BusinessService,
    private readonly userService: UserService,
  ) {}

  @Get(':proposalId')
  @ApiOkResponse({
    type: ResGetProposalByIdDto,
    description: '견적서 ID 로 정보 조회',
  })
  public async getProposalById(@Req() req, @Res() res, @Param() proposalId) {
    const proposalInfo = await this.proposalService.findProposalById(
      Number(proposalId.proposalId),
    );

    res.json({ success: true, code: 200, proposal: proposalInfo });
  }

  @Post('email')
  @ApiOkResponse({
    type: ResSaveProposalDto,
    description: '이메일로 전송',
  })
  @UseInterceptors(FileInterceptor('file'))
  public async sendEmailToCustomer(
    @Req() req,
    @Res() res,
    @Body() reqSendToCustomerInfo: ReqSendEmailToCustomerDto,
    @UploadedFile() file,
  ) {
    const { business_id, business_user_id } = req.user;

    const businessDetails = await this.businessService.findBusinessById(
      Number(business_id),
    );

    const businessUserDetails = await this.userService.findUserById(
      business_user_id,
    );

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

    const fileName = `${businessDetails.name}견적서(${savedProposal.identifiers[0].id})`;
    await this.s3Service.uploadFile(file, fileName);
    if (!savedProposal) {
      throw new CustomInternalException('Create proposal failed');
    }

    const presigned_url = this.s3Service.generatePresignedUrl(fileName);

    const result = await this.mailService.sendRequestMail({
      clientEmail: reqSendToCustomerInfo.clientEmail,
      clientName: reqSendToCustomerInfo.proposalData.customer_company_rep,
      business_user_id,
      proposal_id: savedProposal.identifiers[0].id,
      presigned_url,
      business_name: businessDetails.name,
      business_user_email: businessUserDetails.email,
      business_user_name: businessUserDetails.name,
    });
    if (result.rejected.length >= 1) {
      throw new CustomInternalException('internal server error');
    }
    res.json(
      new ResSaveProposalDto(
        { success: true, code: 200 },
        'Email Successfully Sent ',
      ),
    );
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
