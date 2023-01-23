import { CustomBadRequestException } from './../../exceptions/customBadRequest.exception';
import { RegisterDataDto } from './../auth/dtos/registerData.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  public async findOneByEmail(email: any): Promise<UserEntity | null> {
    return await this.userRepository.findUserByEmail(email);
  }

  public async createUser(
    registerInfo: RegisterDataDto,
  ): Promise<UserEntity | null> {
    const userExist = await this.userRepository.findOneByEmailOrPhone(
      registerInfo,
    );
    if (userExist) {
      throw new CustomBadRequestException('User Already Exists');
    }

    const user = await this.userRepository.saveUser(registerInfo);

    return user;
  }
}
