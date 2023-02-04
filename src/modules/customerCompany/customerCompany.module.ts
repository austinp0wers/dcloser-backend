import { CustomerCompanyRepository } from './customerCompany.repository';
import { CustomerCompanyEntity } from './customerCompany.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
@Module({
  imports: [TypeOrmModule.forFeature([CustomerCompanyEntity])],
  providers: [CustomerCompanyRepository],
  exports: [CustomerCompanyRepository],
  controllers: [],
})
export class CustomerCompanyModule {}
