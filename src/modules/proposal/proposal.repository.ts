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

  public async updateProposal(proposalBody: ProposalEntity): Promise<any> {
    return await this.proposalRepository
      .createQueryBuilder()
      .insert()
      .into(ProposalEntity, [
        'id',
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
      .values(proposalBody)
      .orUpdate(
        [
          'proposal_title',
          'customer_company_rep',
          'business_id',
          'business_user_id',
          'customer_company_id',
          'paid_period',
          'total_payment_price',
          'expire_at',
          'status',
        ],
        ['id'],
      )
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
