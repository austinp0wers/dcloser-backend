import { ApiProperty } from '@nestjs/swagger';
export class ResGetCustomerCompaniesDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  business_id: number;
}
