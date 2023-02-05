import { ProductService } from './product.service';
import { ResponseInterceptor } from './../../interceptors/response.interceptor';
import { Controller, Get, Req, Res, UseInterceptors } from '@nestjs/common';

@Controller('product')
@UseInterceptors(new ResponseInterceptor())
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('list')
  public async getProductList(@Req() req, @Res() res) {
    await this.productService.getProductList();
  }
}
