import { ApiProperty } from '@nestjs/swagger';
import { TokenPayloadDto } from './tokenPayload.dto';
export class LoginResponseDto {
  @ApiProperty()
  token: TokenPayloadDto;
  @ApiProperty()
  success: boolean;
  @ApiProperty()
  code: number;
  constructor(
    status: { success: boolean; code: number },
    accessToken: TokenPayloadDto,
  ) {
    this.token = accessToken;
    this.success = status.success;
    this.code = status.code;
  }
}
