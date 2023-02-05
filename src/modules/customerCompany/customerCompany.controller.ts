import { ResponseInterceptor } from './../../interceptors/response.interceptor';
import { CustomNotFoundException } from 'src/exceptions/customNotFound.exception';
import { CustomerCompanyService } from './customerCompany.service';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';

@Controller('customer-company')
@UseInterceptors(new ResponseInterceptor())
export class CustomerCompanyController {
  constructor(private customerCompanyService: CustomerCompanyService) {}

  @Get(':business_id')
  public async getCustomerCompanies(
    @Req() req,
    @Res() res,
    @Param() business_id,
  ) {
    const customerCompanies =
      await this.customerCompanyService.findCustomerCompanies(business_id);

    if (!customerCompanies) {
      throw new CustomNotFoundException('customer companies not found');
    }

    res.json({ code: 200, status: 'success', customerCompanies });
  }

  @Post('')
  public async saveCustomerCompanies(
    @Req() req,
    @Res() res,
    @Body() saveCustomerCompanyDto,
  ) {}
}
