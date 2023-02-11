import { SaveMailSentDto } from './dtos/save.mail.sent.dto';
import { CustomInternalException } from './../../../exceptions/customInternal.exception';
import { MailRepository } from './mail.repository';
import { MailerService } from '@nestjs-modules/mailer';
import { ConflictException, Injectable } from '@nestjs/common';
import { recommendProposalHtml } from './htmls/recommend.proposal';
@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly mailRepo: MailRepository,
  ) {}

  async sendRequestMail(
    clientEmail: string[],
    clientName: string,
    business_user_id: string,
    proposal_id: number,
  ): Promise<any> {
    const saveResult = await this.mailerService.sendMail({
      to: clientEmail,
      from: `"DCLOSER" <${process.env.EMAIL_AUTH_EMAIL}>`,
      subject: '견적서가 도착했습니다',
      html: recommendProposalHtml({
        fromName: 'D.CLOSER',
        fromEmail: `${process.env.EMAIL_AUTH_EMAIL}`,
        toName: clientName,
        toEmail: clientEmail[0],
      }),
    });

    const reqSaveMailSentDto: SaveMailSentDto = {
      business_user_id,
      proposal_id,
      sent_to: clientName,
      sent_email: clientEmail[0],
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
