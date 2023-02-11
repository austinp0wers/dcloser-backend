import { ReqSaveProductDto } from './dtos/request/req.save.product.dto';
import { SaveProductDto } from './dtos/save.product.dto';
import { ApiTags } from '@nestjs/swagger';
import { ProductService } from './product.service';
import { ResponseInterceptor } from './../../interceptors/response.interceptor';
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

@Controller('product')
@ApiTags('product')
@UseInterceptors(new ResponseInterceptor())
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('')
  public async getProductList(@Req() req, @Res() res) {
    const { business_id } = req.user;
    const products = await this.productService.getProductList(business_id);
    res.json({ success: true, code: 200, products });
  }

  @Get('/price/:productId')
  public async getProductPrice(@Req() req, @Res() res, @Param() productId) {
    const product_price = await this.productService.getProductPrice(productId);
    res.json({ success: true, code: 200, product_price });
  }

  @Post('')
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
    res.json({ success: true, code: 200, message: 'save successful' });
  }
}
