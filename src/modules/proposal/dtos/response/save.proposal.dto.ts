import { ApiProperty } from '@nestjs/swagger';

export class ResSaveSuccessDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  code: number;

  @ApiProperty()
  message: string;

  constructor(status: { success: boolean; code: number }, message: string) {
    this.code = status.code;
    this.success = status.success;
    this.message = message;
  }
}
