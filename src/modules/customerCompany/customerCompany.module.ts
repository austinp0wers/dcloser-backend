import { CustomerCompanyEntity } from './customerCompany.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
@Module({
  imports: [TypeOrmModule.forFeature([CustomerCompanyEntity])],
  providers: [],
  exports: [],
  controllers: [],
})
export class CustomerCompanyModule {}
