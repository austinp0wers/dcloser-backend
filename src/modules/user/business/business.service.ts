import { BusinessRepository } from './business.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class BusinessService {
  constructor(private businessRepo: BusinessRepository) {}

  public async saveBusiness(saveBusinessDto) {
    return await this.businessRepo.saveBusiness(saveBusinessDto);
  }

  public async findBusinessList() {
    return await this.businessRepo.findBusinesses();
  }

  public async findBusinessById(business_id) {
    return await this.businessRepo.findBusinessById(business_id);
  }
}
