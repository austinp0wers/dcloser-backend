import { UserRoleEnum } from './../user/enums/role.enum';
import { CustomNotFoundException } from './../../exceptions/customNotFound.exception';
import { ApiConfigService } from './../../shared/services/api-config.service';
import { TokenPayloadDto } from './dtos/tokenPayload.dto';
import { UserEntity } from './../user/user.entity';
import { LoginDataDto } from './dtos/loginData.dto';
import { UserService } from './../user/user.service';
import { TokenTypes } from '../../common/enums/token-type';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { validatePasswordHash } from 'src/common/utils';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    private configService: ApiConfigService,
  ) {}

  async validateUser(loginDataDto: LoginDataDto): Promise<UserEntity | null> {
    const user = await this.userService.findOneByEmail({
      email: loginDataDto.email,
    });
    if (!user) {
      throw new CustomNotFoundException('User not found');
    }

    const isPasswordValid = await validatePasswordHash(
      loginDataDto.password,
      user.password,
    );

    if (!isPasswordValid) throw new CustomNotFoundException('User not found');

    return user;
  }

  async createAccessToken(loginData: { role: UserRoleEnum; userId: number }) {
    return new TokenPayloadDto({
      expiresIn: this.configService.authConfig.jwtExpirationTime,
      accessToken: await this.jwtService.signAsync({
        userId: loginData.userId,
        type: TokenTypes.ACCESS_TOKEN,
        role: loginData.role,
      }),
    });
  }
}
