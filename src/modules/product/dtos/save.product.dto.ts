import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class SaveProductDto {
  @ApiProperty()
  @IsString()
  @Transform(({ value }) => value?.trim())
  @IsNotEmpty()
  name: string;

  @IsString()
  business_user_id: string;

  @IsInt()
  business_id: number;
}
