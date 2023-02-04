import { MailerService } from '@nestjs-modules/mailer';
import { ConflictException, Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}

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

  async sendMail(clientEmail: string[]): Promise<any> {
    return await this.mailerService
      .sendMail({
        to: clientEmail,
        from: '"dcloser" <llkpartners1210@gmail.com>',
        subject: 'Testing',
        text: 'is this working?',
        html: '<div><b>서비스 제안</b></div><div><span>서비스 조건</span><span>시작일자</span><span>종료일자</span></div>',
      })
      .then((result) => {
        console.log('result', result);
      })
      .catch((error) => {
        console.log('error', error.message);
        new ConflictException(error);
      });
    return true;
  }
}
