import { SendRequestMailDto } from './dtos/request/send.request.mail.dto';
import { SaveMailSentDto } from './dtos/save.mail.sent.dto';
import { CustomInternalException } from './../../../exceptions/customInternal.exception';
import { MailRepository } from './mail.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { recommendProposalHtml } from './htmls/recommend.proposal';
@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly mailRepo: MailRepository,
  ) {}

  async sendRequestMail(sendMailDto: SendRequestMailDto): Promise<any> {
    const saveResult = await this.mailerService.sendMail({
      to: sendMailDto.clientEmail,
      from: `${sendMailDto.business_name} <${process.env.EMAIL_AUTH_EMAIL}>`,
      subject: '견적서가 도착했습니다',
      html: recommendProposalHtml(
        {
          fromName: sendMailDto.business_user_name,
          fromEmail: sendMailDto.business_user_email,
          toName: sendMailDto.clientName,
          toEmail: sendMailDto.clientEmail[0],
        },
        sendMailDto.presigned_url,
      ),
    });

    const reqSaveMailSentDto: SaveMailSentDto = {
      business_user_id: sendMailDto.business_user_id,
      proposal_id: sendMailDto.proposal_id,
      sent_to: sendMailDto.clientName,
      sent_email: sendMailDto.clientEmail[0],
    };
    this.mailRepo
      .saveMailSent(reqSaveMailSentDto)
      .then()
      .catch((error) => {
        console.log('error', error);
        throw new CustomInternalException('Save Mail Sent Exception');
      });
    return saveResult;
  }
}
