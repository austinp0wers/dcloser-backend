import { BusinessInfoDto } from './dtos/business.info.dto';
import { BusinessEntity } from './business.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
@Injectable()
export class BusinessRepository {
  constructor(
    @InjectRepository(BusinessEntity)
    private businessRepo: Repository<BusinessEntity>,
  ) {}
  public async saveBusiness(saveBusinessDto): Promise<any> {
    return await this.businessRepo
      .createQueryBuilder()
      .insert()
      .into(BusinessEntity, ['name'])
      .values(saveBusinessDto)
      .execute();
  }

  public async findBusinesses(): Promise<BusinessInfoDto[]> {
    return await this.businessRepo
      .createQueryBuilder()
      .select('businesses')
      .from(BusinessEntity, 'businesses')
      .getMany();
  }

  public async findBusinessById(business_id): Promise<BusinessEntity> {
    return await this.businessRepo
      .createQueryBuilder()
      .select('businesses')
      .from(BusinessEntity, 'businesses')
      .where('businesses.id = :business_id', { business_id })
      .getOne();
  }
}
