import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { SaveProductDto } from '../save.product.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ReqSaveProductDto {
  @ApiProperty()
  @Type(() => SaveProductDto)
  @IsNotEmpty()
  product: SaveProductDto;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  price: number;
}
