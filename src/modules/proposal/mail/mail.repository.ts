import { MailSentEntity } from './mail.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class MailRepository {
  constructor(
    @InjectRepository(MailSentEntity)
    private mailSentRepo: Repository<MailSentEntity>,
  ) {}

  public async saveMailSent(saveMailSentDto: any) {
    this.mailSentRepo
      .createQueryBuilder()
      .insert()
      .into(MailSentEntity)
      .values({ ...saveMailSentDto })
      .execute();
  }
}
