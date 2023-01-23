import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomBadRequestException extends HttpException {
  constructor(error: any) {
    super({ code: 400, error, level: 'error' }, HttpStatus.BAD_REQUEST);
  }
}
