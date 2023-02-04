import { CustomerCompanyRepository } from './../customerCompany/customerCompany.repository';
import { ProductsOfferedRepository } from './../product/offeredProducts/productsOffered.repository';
import { UserEntity } from './../user/user.entity';
import { UserRepository } from './../user/user.repository';
import { OldProposalRepository } from './oldProposal/oldProposal.repository';
import { InsertOldProposalDto } from './oldProposal/dtos/insertOldProposal.dto';
import { ReqCreateProposalDto } from './dtos/request/create.request.proposal.dto';
import { ProposalEntity } from './proposal.entity';
import { SaveProposalDto } from './dtos/saveProposal.dto';
import { ProposalRepository } from './proposal.repository';
import { Injectable } from '@nestjs/common';
import { response } from 'express';
@Injectable()
export class ProposalService {
  constructor(
    private proposalRepo: ProposalRepository,
    private oldProposalRepo: OldProposalRepository,
    private userRepository: UserRepository,
    private productsOfferedRepo: ProductsOfferedRepository,
    private customerCompanyRepo: CustomerCompanyRepository,
  ) {}

  public async findProposalById(proposal_id: number) {
    const proposalInfo: any = await this.proposalRepo.findProposalByProposalId(
      proposal_id,
    );
    // customer company details
    if (proposalInfo.customer_company_id) {
      const customerDetail =
        await this.customerCompanyRepo.findCustomerCompanyById(
          proposalInfo.customer_company_id,
        );
      proposalInfo.customer_company_name = customerDetail.name;
    }

    if (proposalInfo.products_id) {
      // product list
      const productsInfo = await this.productsOfferedRepo.findByProposalId(
        proposal_id,
      );
      proposalInfo.productsInfo = productsInfo;
    }
    return proposalInfo;
  }

  public async saveProposal(
    proposalBody: ReqCreateProposalDto,
    business_id: number,
    business_user_id: string,
  ) {
    const saveProposalDto: SaveProposalDto = {
      ...proposalBody,
      business_id,
      business_user_id,
    };
    const proposal: ProposalEntity = ProposalEntity.create(saveProposalDto);
    if (saveProposalDto.id) {
      const pastProposal = await this.proposalRepo.findProposalByProposalId(
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

    // products_offered DB에 선택된 제품들 저장하기.
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
    const customerNameAndId = new Map();
    const proposals = [];
    let responseDto;

    // 견적서 리스트 뽑아 오기.
    const proposalList = await this.proposalRepo.findProposals(business_id);

    for (let i = 0; i < proposalList.length; i++) {
      userIdList.push(proposalList[i].business_user_id);
    }

    // 작성한 담당자 이름 조회 & map
    const userNameList: UserEntity[] =
      await this.userRepository.findUserNameByIds(userIdList);

    for (let i = 0; i < userNameList.length; i++) {
      userNameAndId.set(userNameList[i].id, userNameList[i].name);
    }

    // 고객사 정보 조회 & map
    const customerCompanyName =
      await this.customerCompanyRepo.findCustomerCompanies(business_id);

    if (customerCompanyName.length >= 1) {
      for (let i = 0; i < userNameList.length; i++) {
        customerNameAndId.set(
          customerCompanyName[i].id,
          customerCompanyName[i].name,
        );
      }
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
      responseDto.customerCompanyName = customerNameAndId.get(
        proposalList[i].customer_company_id,
      );
      proposals.push(responseDto);
    }

    return proposals;
  }
}
