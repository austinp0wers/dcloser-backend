import { CustomInternalException } from './../../../exceptions/customInternal.exception';
import { ReqSaveMailSentDto } from './dtos/request/save.mail.sent.dto';
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

  async sendHello(): Promise<boolean> {
    await this.mailerService
      .sendMail({
        to: 'austintaetious@gmail.com',
        from: 'llkpartners1210@gmail.com',
        subject: 'Hello',
        text: 'Hello World!',
        html: '<b>Hello World</b>',
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log('error', error);
        new ConflictException(error);
      });
    return true;
  }

  async sendMail(
    clientEmail: string[],
    business_user_id: string,
    proposal_id: number,
  ): Promise<any> {
    const saveResult = await this.mailerService.sendMail({
      to: clientEmail,
      from: '"DCLOSER" <llkpartners1210@gmail.com>',
      subject: '견적서가 도착했습니다',
      html: recommendProposalHtml({
        fromName: '테스트',
        fromEmail: 'llkpartners1210@gmail.com',
        toName: '오스틴',
        toEmail: 'test@gmail.com',
      }),
    });

    const reqSaveMailSentDto: ReqSaveMailSentDto = {
      business_user_id,
      proposal_id,
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
