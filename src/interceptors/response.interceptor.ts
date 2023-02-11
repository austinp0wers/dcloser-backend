import { CustomInternalException } from './../exceptions/customInternal.exception';
import { CustomBadRequestException } from './../exceptions/customBadRequest.exception';
import { CustomNotFoundException } from 'src/exceptions/customNotFound.exception';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';
import { CustomUnauthorizedException } from 'src/exceptions/customUnauthorizedError.exception';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor() {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((error) => {
        if (
          error instanceof CustomBadRequestException ||
          error instanceof BadRequestException
        ) {
          throw error;
        }
        if (error instanceof CustomNotFoundException) {
          throw error;
        }
        if (error instanceof CustomInternalException) {
          throw error;
        }
        if (error instanceof CustomUnauthorizedException) {
          throw error;
        }
        throw new CustomInternalException(error);
      }),
    );
  }
}
