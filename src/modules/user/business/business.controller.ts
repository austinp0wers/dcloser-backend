import { ResponseInterceptor } from './../../../interceptors/response.interceptor';
import { ApiTags } from '@nestjs/swagger';
import { ReqSaveBusinessDto } from './dtos/request/save.business.dto';
import { BusinessService } from './business.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';

@Controller('business')
@ApiTags('business')
@UseInterceptors(new ResponseInterceptor())
export class BusinessController {
  constructor(private businessService: BusinessService) {}

  @Post()
  public async saveBusiness(
    @Req() req,
    @Res() res,
    @Body() businessInfo: ReqSaveBusinessDto,
  ) {
    await this.businessService.saveBusiness(businessInfo);
    res.json({ success: true, code: 200, message: 'save successful' });
  }

  @Get()
  public async getBusinesses(@Req() req, @Res() res) {
    const businesses = await this.businessService.findBusinessList();
    res.json({ success: true, code: 200, businesses });
  }
}
