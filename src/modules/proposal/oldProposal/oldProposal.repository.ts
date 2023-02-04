import { ProposalEntity } from './../proposal.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OldProposalEntity } from './oldProposal.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
@Injectable()
export class OldProposalRepository {
  constructor(
    @InjectRepository(OldProposalEntity)
    private oldProposalRepo: Repository<OldProposalEntity>,
  ) {}

  public async insertOldProposal(oldProposal) {
    return await this.oldProposalRepo
      .createQueryBuilder()
      .insert()
      .into(OldProposalEntity, [
        'proposal_id',
        'proposal_title',
        'customer_company_rep',
        'business_id',
        'business_user_id',
        'customer_company_id',
        'paid_period',
        'total_payment_price',
        'expire_at',
        'status',
      ])
      .values(oldProposal)
      .execute();
  }
}
