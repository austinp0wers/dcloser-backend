import { CustomerCompanyEntity } from './customerCompany.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class CustomerCompanyRepository {
  constructor(
    @InjectRepository(CustomerCompanyEntity)
    private customerCompanyRepo: Repository<CustomerCompanyEntity>,
  ) {}

  public async findCustomerCompanies(business_id: number) {
    return await this.customerCompanyRepo
      .createQueryBuilder()
      .from(CustomerCompanyEntity, 'customer_company')
      .select('customer_company')
      .where('customer_company.business_id = :business_id', { business_id })
      .getMany();
  }

  public async findCustomerCompanyById(customer_company_id: number) {
    return await this.customerCompanyRepo
      .createQueryBuilder()
      .from(CustomerCompanyEntity, 'customerCompany')
      .select('customerCompany')
      .where('customerCompany.id =: customer_company_id', {
        customer_company_id,
      })
      .getOne();
  }
}
