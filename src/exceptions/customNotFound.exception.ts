import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomNotFoundException extends HttpException {
  constructor(error: any) {
    super({ code: 404, error, level: 'error' }, HttpStatus.NOT_FOUND);
  }
}
