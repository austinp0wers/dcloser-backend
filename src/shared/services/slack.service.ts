import { Injectable } from '@nestjs/common';
import { IncomingWebhook } from '@slack/webhook';

@Injectable()
export class SlackService {
  private webhook;

  constructor() {
    this.webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);
  }

  public sendMessage(message: string): void {
    const channel = this.getChannelName();

    this.webhook
      .send({
        channel,
        attachments: [
          {
            title: 'Server Error',
            color: '#56cd64',
            text: message,
          },
        ],
      })
      .then()
      .catch((err) => console.log(err));
  }

  public getMessgeContents(...args: any[]) {
    const errorMessage =
      (args[0] && args[0].errorMessage) || '에러 메세지 누락';
    console.log(errorMessage);

    const contents = {
      headers: (args[0] && args[0].headers) || '헤더 누락',
      errorMessage: (args[0] && args[0].errorMessage) || '에러 메세지 누락',
      errorLine: (args[0] && args[0].errorLine) || '에러 라인 누락',
      exception: (args[0] && args[0].exception) || '에러 정보 누락',
    };

    return `Headers: ${JSON.stringify(contents.headers)}\n\nErrorMessage: ${
      contents.errorMessage
    }\n\nErrorLine: ${contents.errorLine}\n\nException-Details:${
      contents.exception
    }`;
  }

  public getChannelName(): string {
    let channel = null;
    switch (process.env.RUNNING_ENV) {
      case 'local':
        channel = '#local-dcloser-v1';
        break;
      case 'development':
        channel = '#dev-dcloser-v1';
        break;
      case 'production':
        channel = '#prod-dcloser-v1';
        break;
      default:
        channel = '';
    }

    return channel;
  }
}
