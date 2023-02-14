import { ResSaveSuccessDto } from './../proposal/dtos/response/save.proposal.dto';
import { ResProductListDto } from './dtos/response/get.productList.dto';
import { ReqSaveProductDto } from './dtos/request/req.save.product.dto';
import { SaveProductDto } from './dtos/save.product.dto';
import { ApiTags, ApiOkResponse } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ResponseInterceptor } from './../../interceptors/response.interceptor';
import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';

@Controller('product')
@ApiTags('product')
@UseInterceptors(new ResponseInterceptor())
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  @ApiOkResponse({
    type: ResProductListDto,
    description: '제품 목록 정보',
  })
  public async getProductList(@Req() req, @Res() res) {
    const { business_id } = req.user;
    const products = await this.productService.getProductList(business_id);
    res.json(new ResProductListDto(true, 200, products));
  }

  @Post()
  @ApiOkResponse({
    type: ResSaveSuccessDto,
    description: '제품 저장 결과',
  })
  public async saveProduct(
    @Req() req,
    @Res() res,
    @Body() saveProductDto: ReqSaveProductDto,
  ) {
    const { business_id, business_user_id } = req.user;
    const reqSaveProductDto: SaveProductDto = saveProductDto.product;
    const reqSaveProductPriceDto = saveProductDto.price;
    reqSaveProductDto.business_id = business_id;
    reqSaveProductDto.business_user_id = business_user_id;

    await this.productService.saveProduct(
      reqSaveProductDto,
      reqSaveProductPriceDto,
    );
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
}
