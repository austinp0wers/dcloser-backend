import { ReqManagerRegisterDto } from './dtos/request/manager.register.dto';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { UserEntity } from './../user/user.entity';
import { UserService } from './../user/user.service';
import { RegisterResponseDto } from './dtos/registerResponse.dto';
import { RegisterDataDto } from './dtos/registerData.dto';
import { LoginResponseDto } from './dtos/loginResponse.dto';
import { ResponseInterceptor } from './../../interceptors/response.interceptor';
import { LoginDataDto } from './dtos/loginData.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';

@Controller('auth')
@ApiTags('auth')
@UseInterceptors(new ResponseInterceptor())
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  @ApiOkResponse({
    type: LoginResponseDto,
    description: '로그인 결과',
  })
  async userLogin(@Req() req, @Res() res, @Body() loginDataDto: LoginDataDto) {
    const user: UserEntity = await this.authService.validateUser(loginDataDto);
    const access_token = await this.authService.createAccessToken({
      role: user.role,
      user_id: user.id,
      business_id: user.business_id,
    });

    return res.json(
      new LoginResponseDto({ success: true, code: 200 }, access_token),
    );
  }

  @Post('register/user')
  @ApiOkResponse({
    type: RegisterResponseDto,
    description: '기업 구성원 회원가입 결과',
  })
  async userRegister(
    @Req() req,
    @Res() res,
    @Body() registerData: RegisterDataDto,
  ): Promise<RegisterResponseDto> {
    await this.userService.createUser(registerData);

    return res.json(new RegisterResponseDto(200, 'OK', true));
  }

  @Post('register/manager')
  @ApiOkResponse({
    type: RegisterResponseDto,
    description: '기업 관리자 회원가입 결과',
  })
  async managerRegister(
    @Req() req,
    @Res() res,
    @Body() registerData: ReqManagerRegisterDto,
  ): Promise<RegisterResponseDto> {
    await this.userService.createManager(registerData);

    return res.json(new RegisterResponseDto(200, 'OK', true));
  }
}
