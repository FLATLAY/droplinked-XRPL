import {
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Exception<T> {
  statusCode: number;
  status: string;
  data: T;
}

export class ExceptionInterceptor<T>
  implements NestInterceptor<T, Exception<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Exception<T>> {
    return next.handle().pipe(
      catchError((error: any) => {
        return throwError(
          () =>
            new HttpException(
              {
                statusCode: error.status || HttpStatus.BAD_REQUEST,
                status: 'failed',
                data: {
                  message: error.response
                    ? error.response.data
                      ? error.response.data.message
                      : error.response.message
                    : error.message,
                },
              },
              error.status || HttpStatus.BAD_REQUEST,
            ),
        );
      }),
    );
  }
}
