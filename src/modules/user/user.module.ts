import { BusinessRepository } from './business/business.repository';
import { BusinessService } from './business/business.service';
import { BusinessController } from './business/business.controller';
import { BusinessEntity } from './business/business.entity';
import { UserEntity } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, BusinessEntity])],
  controllers: [UserController, BusinessController],
  providers: [UserService, UserRepository, BusinessService, BusinessRepository],
  exports: [UserService, UserRepository],
})
export class UserModule {}
