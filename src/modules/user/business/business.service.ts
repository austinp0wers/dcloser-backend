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
}
