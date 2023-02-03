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

  public async findUserByEmail(userInfo: any): Promise<UserEntity | null> {
    return await this.userEntity.findOneBy(userInfo);
  }

  public async findOneByEmailOrPhone(registerInfo): Promise<UserEntity | null> {
    return await this.userEntity.findOneBy({
      email: registerInfo.email,
      phone: registerInfo.phone,
    });
  }

  public async findUserById(id: string): Promise<UserEntity | null> {
    return await this.userEntity.findOneBy({
      id,
    });
  }

  public async findUserNameByIds(idList: string[]) {
    return await this.userEntity
      .createQueryBuilder()
      .select('users')
      .from(UserEntity, 'users')
      .where('users.id IN (:...ids)', { ids: idList })
      .getMany();
  }
  public async saveUser(registerInfo: RegisterDataDto): Promise<UserEntity> {
    const userInstance = this.userEntity.create(registerInfo);
    await this.userEntity.insert(userInstance);
    return userInstance;
  }
}
