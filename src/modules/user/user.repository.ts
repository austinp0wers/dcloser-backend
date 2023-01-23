import { RegisterDataDto } from './../auth/dtos/registerData.dto';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
  ) {}

  public async findUserByEmail(userInfo): Promise<UserEntity | null> {
    return await this.userEntity.findOneBy(userInfo);
  }

  public async findOneByEmailOrPhone(registerInfo) {
    return await this.userEntity.findOneBy({
      email: registerInfo.email,
      phone: registerInfo.phone,
    });
  }

  public async saveUser(registerInfo: RegisterDataDto): Promise<UserEntity> {
    const userInstance = this.userEntity.create(registerInfo);
    await this.userEntity.insert(userInstance);
    return userInstance;
  }
}
