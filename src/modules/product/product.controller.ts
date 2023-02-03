import { ProductService } from './product.service';
import { ResponseInterceptor } from './../../interceptors/response.interceptor';
import { Controller, Get, Req, Res, UseInterceptors } from '@nestjs/common';

@UseInterceptors(new ResponseInterceptor())
@Controller('/product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get('list')
  public async getProductList(@Req() req, @Res() res) {
    this.productService.getProductList();
  }
}
