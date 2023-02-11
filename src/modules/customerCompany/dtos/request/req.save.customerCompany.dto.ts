import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class ReqSaveCustomerCompanyDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  @Length(1, 126)
  readonly name: string;
}
