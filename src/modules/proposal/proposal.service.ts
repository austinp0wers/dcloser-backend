import { ProposalRepository } from './proposal.repository';
import { Injectable } from '@nestjs/common';
@Injectable()
export class ProposalService {
  constructor(private proposalRepo: ProposalRepository) {}

  public async saveProposal(proposalBody) {
    if (!proposalBody) return 'nothing to save';
    console.log('proposalBody', proposalBody);
    const proposalId = proposalBody.id ? proposalBody.id : null;

    return await this.proposalRepo.updateProposal(proposalId, proposalBody);
  }

  public async getProposalList() {
    await this.proposalRepo.findProposals();
  }
}
