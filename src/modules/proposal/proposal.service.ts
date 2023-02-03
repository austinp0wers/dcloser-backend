import { ProductsOfferedRepository } from './../product/offeredProducts/productsOffered.repository';
import { UserEntity } from './../user/user.entity';
import { UserRepository } from './../user/user.repository';
import { OldProposalRepository } from './oldProposal/oldProposal.repository';
import { InsertOldProposalDto } from './oldProposal/dtos/insertOldProposal.dto';
import { CustomBadRequestException } from './../../exceptions/customBadRequest.exception';
import { ReqCreateProposalDto } from './dtos/request/create.request.proposal.dto';
import { ProposalEntity } from './proposal.entity';
import { SaveProposalDto } from './dtos/saveProposal.dto';
import { ProposalRepository } from './proposal.repository';
import { Injectable } from '@nestjs/common';
@Injectable()
export class ProposalService {
  constructor(
    private proposalRepo: ProposalRepository,
    private oldProposalRepo: OldProposalRepository,
    private userRepository: UserRepository,
    private productsOfferedRepo: ProductsOfferedRepository,
  ) {}

  public async saveProposal(
    proposalBody: ReqCreateProposalDto,
    business_id,
    business_user_id,
  ) {
    if (!proposalBody)
      throw new CustomBadRequestException('no proposal data to save');
    const saveProposalDto: SaveProposalDto = {
      ...proposalBody,
      business_id,
      business_user_id,
    };
    const proposal: ProposalEntity = ProposalEntity.create(saveProposalDto);
    if (saveProposalDto.id) {
      const pastProposal = await this.proposalRepo.findProposalById(
        proposal.id,
      );
      const oldProposal: InsertOldProposalDto = {
        proposal_id: pastProposal.id,
        ...pastProposal,
      };
      if (pastProposal) {
        this.oldProposalRepo
          .insertOldProposal(oldProposal)
          .then()
          .catch((err) => console.log(err.message));
      }
    }
    const updateProposalResult = await this.proposalRepo.updateProposal(
      proposal,
    );
    // products_offered DB에 선택된 제품들 저장.

    for (let i = 0; i < proposalBody.products_id.length; i++) {
      const product_detail = {
        products_id: proposalBody.products_id[i],
        proposal_id: updateProposalResult.generatedMaps[0].id,
      };
      await this.productsOfferedRepo.insertProductsOffered(product_detail);
    }

    return updateProposalResult;
  }

  public async getProposalList(business_id: any) {
    const userIdList = [];
    const userNameAndId = new Map();
    const proposals = [];
    let responseDto;

    const proposalList = await this.proposalRepo.findProposals(business_id);

    for (let i = 0; i < proposalList.length; i++) {
      userIdList.push(proposalList[i].business_user_id);
    }

    const userNameList: UserEntity[] =
      await this.userRepository.findUserNameByIds(userIdList);

    for (let i = 0; i < userNameList.length; i++) {
      userNameAndId.set(userNameList[i].id, userNameList[i].name);
    }

    for (let i = 0; i < proposalList.length; i++) {
      responseDto = { ...proposalList[i] };
      const products_name = await this.productsOfferedRepo.findByProposalId(
        proposalList[i].id,
      );
      responseDto.products_name = products_name;
      responseDto.biz_user_name = userNameAndId.get(
        proposalList[i].business_user_id,
      );
      proposals.push(responseDto);
    }

    return proposals;
  }
}
