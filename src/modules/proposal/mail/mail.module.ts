import { MailSentEntity } from './mail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MailRepository } from './mail.repository';
import { MailService } from './mail.service';
import { Module } from '@nestjs/common';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    TypeOrmModule.forFeature([MailSentEntity]),
    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: `smtps://${process.env.EMAIL_AUTH_EMAIL}:${process.env.EMAIL_AUTH_PASSWORD}@${process.env.EMAIL_HOST}`,
        defaults: {
          from: '"AUSTINS" <austinp0wers@dcloser.com>',
        },
        template: {
          dir: __dirname + '/templates',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  providers: [MailService, MailRepository],
  exports: [MailService, MailRepository],
})
export class MailModule {}
