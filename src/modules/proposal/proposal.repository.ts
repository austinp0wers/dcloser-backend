import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProposalEntity } from './proposal.entity';

@Injectable()
export class ProposalRepository {
  constructor(
    @InjectRepository(ProposalEntity)
    private proposalRepository: Repository<ProposalEntity>,
  ) {}

  public async findProposalByProposalId(
    proposal_id: number,
  ): Promise<ProposalEntity> {
    return await this.proposalRepository
      .createQueryBuilder()
      .select('proposals')
      .from(ProposalEntity, 'proposals')
      .where('proposals.id = :proposal_id', { proposal_id })
      .getOne();
  }

  public async saveProposal(proposalBody: ProposalEntity): Promise<any> {
    return await this.proposalRepository
      .createQueryBuilder()
      .insert()
      .into(ProposalEntity)
      .values([
        {
          proposal_title: proposalBody.proposal_title,
          customer_company_rep: proposalBody.customer_company_rep,
          business_id: proposalBody.business_id,
          business_user_id: proposalBody.business_user_id,
          customer_company_id: proposalBody.customer_company_id,
          paid_period: proposalBody.paid_period,
          total_payment_price: proposalBody.total_payment_price,
          expire_at: proposalBody.expire_at,
          status: proposalBody.status,
        },
      ])
      .execute();
  }

  // users테이블에서 A = 해당 userId를 가진 column 이 가진 business_id 로
  // where proposals.business_id = A
  public async findProposals(business_id) {
    return await this.proposalRepository
      .createQueryBuilder('proposals')
      .where('proposals.business_id = :business_id', { business_id })
      .orderBy('id', 'DESC')
      .getMany();
  }
}
