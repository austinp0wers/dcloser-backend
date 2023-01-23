import { HttpException, HttpStatus } from '@nestjs/common';
export class CustomInternalErrorException extends HttpException {
  constructor(error: any) {
    super(
      { code: 500, error, level: 'error' },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
