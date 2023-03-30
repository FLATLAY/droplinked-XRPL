import { NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  statusCode: number;
  status: string;
  data: T;
}

export class ResponseInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      map((data) => {
        const status = data.status;
        delete data.status;
        return {
          statusCode: context.switchToHttp().getResponse().statusCode,
          status: status || 'succeed',
          data: data.data ? data.data : data,
        };
      }),
    );
  }
}
