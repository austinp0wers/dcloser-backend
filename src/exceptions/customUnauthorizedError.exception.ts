import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomUnauthorizedException extends HttpException {
  constructor(err: any) {
    super({ code: 401, err, level: 'info' }, HttpStatus.UNAUTHORIZED);
  }
}
