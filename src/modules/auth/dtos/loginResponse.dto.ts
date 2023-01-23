import { TokenPayloadDto } from './tokenPayload.dto';
export class LoginResponseDto {
  token: TokenPayloadDto;
  success: boolean;
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
