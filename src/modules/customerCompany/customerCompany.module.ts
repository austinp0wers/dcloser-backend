import { CustomerCompanyService } from './customerCompany.service';
import { CustomerCompanyController } from './customerCompany.controller';
import { CustomerCompanyRepository } from './customerCompany.repository';
import { CustomerCompanyEntity } from './customerCompany.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
@Module({
  imports: [TypeOrmModule.forFeature([CustomerCompanyEntity])],
  providers: [CustomerCompanyRepository, CustomerCompanyService],
  exports: [CustomerCompanyRepository],
  controllers: [CustomerCompanyController],
})
export class CustomerCompanyModule {}
