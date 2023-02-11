import { SaveCustomerCompanyDto } from './dtos/save.customerCompany.dto';
import { CustomerCompanyRepository } from './customerCompany.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerCompanyService {
  constructor(private customerCompanyRepo: CustomerCompanyRepository) {}

  public async findCustomerCompanies(business_id) {
    return await this.customerCompanyRepo.findCustomerCompanies(business_id);
  }

  public async saveCustomerCompany(reqSaveCustomerCompany, business_id) {
    const saveCustomerCompanyDto: SaveCustomerCompanyDto =
      new SaveCustomerCompanyDto();
    saveCustomerCompanyDto.name = reqSaveCustomerCompany.name;
    saveCustomerCompanyDto.business_id = business_id;
    return await this.customerCompanyRepo.saveCustomerCompany(
      saveCustomerCompanyDto,
    );
  }
}
