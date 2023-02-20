import { BusinessEntity } from './business/business.entity';
import { UserEntity } from './user.entity';
import { ResUserAndBusinessDto } from './dtos/response/user.detail.dto';
import { CustomNotFoundException } from 'src/exceptions/customNotFound.exception';
import { BusinessService } from './business/business.service';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { ResponseInterceptor } from './../../interceptors/response.interceptor';
import { Controller, Req, Res, UseInterceptors, Get } from '@nestjs/common';

@Controller('user')
@UseInterceptors(new ResponseInterceptor())
@ApiTags('user')
export class UserController {
  constructor(
    private userService: UserService,
    private BusinessService: BusinessService,
  ) {}

  @Get('detail')
  public async getUserDetail(@Req() req, @Res() res) {
    const { business_id, business_user_id } = req.user;

    const userInfo: UserEntity = await this.userService.findUserById(
      business_user_id,
    );
    const businessInfo: BusinessEntity =
      await this.BusinessService.findBusinessById(business_id);

    if (!userInfo || !businessInfo) {
      throw new CustomNotFoundException(
        'User / Business Information Not Found',
      );
    }

    res.json(
      new ResUserAndBusinessDto(true, 200, userInfo.email, businessInfo.name),
    );
  }
}
