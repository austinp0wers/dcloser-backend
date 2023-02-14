import { ResGetCustomerCompaniesDto } from './dtos/response/get.customerCompanies.dto';
import { ResSaveSuccessDto } from './../proposal/dtos/response/save.proposal.dto';
import { ReqSaveCustomerCompanyDto } from './dtos/request/req.save.customerCompany.dto';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { ResponseInterceptor } from './../../interceptors/response.interceptor';
import { CustomNotFoundException } from 'src/exceptions/customNotFound.exception';
import { CustomerCompanyService } from './customerCompany.service';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';

@Controller('customer-company')
@ApiTags('customer-company')
@UseInterceptors(new ResponseInterceptor())
export class CustomerCompanyController {
  constructor(private customerCompanyService: CustomerCompanyService) {}

  @Get()
  @ApiOkResponse({
    type: ResGetCustomerCompaniesDto,
    description: '고객사 회사 정보 조회',
  })
  public async getCustomerCompanies(@Req() req, @Res() res) {
    const { business_id } = req.user;
    const customerCompanies =
      await this.customerCompanyService.findCustomerCompanies(business_id);

    if (!customerCompanies) {
      throw new CustomNotFoundException('customer companies not found');
    }

    res.json({ code: 200, status: 'success', customerCompanies });
  }

  @Post()
  @ApiOkResponse({
    type: ResSaveSuccessDto,
    description: '고객사 회사 정보 저장',
  })
  public async saveCustomerCompanies(
    @Req() req,
    @Res() res,
    @Body() reqSaveCustomerCompanyDto: ReqSaveCustomerCompanyDto,
  ) {
    const { business_id } = req.user;

    await this.customerCompanyService.saveCustomerCompany(
      reqSaveCustomerCompanyDto,
      business_id,
    );

    res.json(
      new ResSaveSuccessDto({ code: 200, success: true }, 'Successfully saved'),
    );
  }
}
