import { CustomerCompanyRepository } from './customerCompany.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerCompanyService {
  constructor(private customerCompanyRepo: CustomerCompanyRepository) {}

  public async findCustomerCompanies(business_id) {
    return await this.customerCompanyRepo.findCustomerCompanies(business_id);
  }
}
