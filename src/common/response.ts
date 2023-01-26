/*
 * @Author: wenreq 294491328@qq.com
 * @Date: 2023-01-26 21:03:28
 * @LastEditors: wenreq 294491328@qq.com
 * @LastEditTime: 2023-01-26 21:15:22
 * @FilePath: /WebServe/src/common/response.ts
 * @Description: 响应拦截器
 */
import { Injectable, NestInterceptor, CallHandler } from '@nestjs/common';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

interface Data<T> {
  data: T;
}

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor {
  intercept(context, next: CallHandler): Observable<Data<T>> {
    return next.handle().pipe(
      map((data) => {
        return {
          data,
          status: 200,
          message: '成功',
          success: true,
        };
      }),
    );
  }
}
