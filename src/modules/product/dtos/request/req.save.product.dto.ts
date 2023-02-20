import { IsInt, IsNotEmpty, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { SaveProductDto } from '../save.product.dto';
import { ApiProperty } from '@nestjs/swagger';

export class ReqSaveProductDto {
  @ApiProperty()
  @Type(() => SaveProductDto)
  @IsNotEmpty()
  @ValidateNested()
  product: SaveProductDto;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  price: number;
}
