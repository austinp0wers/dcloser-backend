import { ApiProperty } from '@nestjs/swagger';

export class ProductNameDto {
  @ApiProperty()
  products_id: string;
}
