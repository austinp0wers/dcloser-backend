import { ApiProperty } from '@nestjs/swagger';
export class ResUserAndBusinessDto {
  @ApiProperty()
  success: boolean;
  @ApiProperty()
  code: number;
  @ApiProperty()
  user_email: string;
  @ApiProperty()
  business_name: string;
  constructor(
    success: boolean,
    code: number,
    user_email: string,
    business_name: string,
  ) {
    this.success = success;
    this.code = code;
    this.user_email = user_email;
    this.business_name = business_name;
  }
}
