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

  public async updateProposal(proposalId, proposalBody) {
    this.proposalRepository.save({ id: proposalId, ...proposalBody });
  }

  public async findProposals() {
    this.proposalRepository.find({});
  }
}
