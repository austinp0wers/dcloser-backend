import { IsInt, IsNotEmpty } from 'class-validator';
export class SaveProductPriceDto {
  @IsInt()
  @IsNotEmpty()
  product_id: number;

  @IsInt()
  @IsNotEmpty()
  price: number;
}
