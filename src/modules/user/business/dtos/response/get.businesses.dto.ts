import { ApiProperty } from '@nestjs/swagger';
import { BusinessInfoDto } from './../business.info.dto';
export class ResGetBusinessesDto {
  @ApiProperty()
  success: boolean;
  @ApiProperty()
  code: number;
  @ApiProperty()
  businesses: BusinessInfoDto[];

  constructor(success: boolean, code: number, businesses: BusinessInfoDto[]) {
    this.success = success;
    this.code = code;
    this.businesses = businesses;
  }
}
