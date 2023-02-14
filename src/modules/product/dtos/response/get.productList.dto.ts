import { ApiProperty } from '@nestjs/swagger';
import { ProductInfoDto } from './../product.info.dto';
export class ResProductListDto {
  @ApiProperty()
  success: boolean;
  @ApiProperty()
  code: number;
  @ApiProperty()
  products: ProductInfoDto[];
  constructor(success: boolean, code: number, products: ProductInfoDto[]) {
    this.success = success;
    this.code = code;
    this.products = products;
  }
}
