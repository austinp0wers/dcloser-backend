import { ApiProperty } from '@nestjs/swagger';
export class RegisterResponseDto {
  @ApiProperty()
  code: number;
  @ApiProperty()
  message: string;
  @ApiProperty()
  success: boolean;

  constructor(code: number, message: string, success: boolean) {
    this.code = code;
    this.message = message;
    this.success = success;
  }
}
