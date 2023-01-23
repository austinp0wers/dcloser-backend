import { CustomInternalErrorException } from './../exceptions/customInternal.exception';
import { CustomBadRequestException } from './../exceptions/customBadRequest.exception';
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { catchError, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  constructor() {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof CustomBadRequestException) {
          throw error;
        }
        throw new CustomInternalErrorException(error);
      }),
    );
  }
}
