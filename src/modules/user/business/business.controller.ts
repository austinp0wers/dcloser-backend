import { ResGetBusinessesDto } from './dtos/response/get.businesses.dto';
import { ResSaveSuccessDto } from './../../proposal/dtos/response/save.proposal.dto';
import { ResponseInterceptor } from './../../../interceptors/response.interceptor';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
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
  @ApiOkResponse({
    type: ResSaveSuccessDto,
    description: '회사정보 저장 결과',
  })
  public async saveBusiness(
    @Req() req,
    @Res() res,
    @Body() businessInfo: ReqSaveBusinessDto,
  ) {
    await this.businessService.saveBusiness(businessInfo);
    res.json(
      new ResSaveSuccessDto(
        {
          success: true,
          code: 200,
        },
        'save successful',
      ),
    );
  }

  @Get()
  @ApiOkResponse({
    type: ResGetBusinessesDto,
    description: '회사정보 조회',
  })
  public async getBusinesses(@Req() req, @Res() res) {
    const businesses = await this.businessService.findBusinessList();
    res.json({ success: true, code: 200, businesses });
  }
}
