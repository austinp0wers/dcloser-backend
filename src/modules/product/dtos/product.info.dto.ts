import { ApiProperty } from '@nestjs/swagger';

export class ProductInfoDto {
  @ApiProperty()
  product_prices_id: number;
  @ApiProperty()
  product_prices_price: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  business_id: number;
}
