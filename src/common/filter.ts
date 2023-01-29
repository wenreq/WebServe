/*
 * @Author: wenreq 294491328@qq.com
 * @Date: 2023-01-27 21:58:13
 * @LastEditors: wenreq 294491328@qq.com
 * @LastEditTime: 2023-01-29 15:18:36
 * @FilePath: /WebServe/src/common/filter.ts
 * @Description: 异常信息拦截
 */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();

    response.status(status).json({
      success: false,
      time: new Date(),
      data: exception,
      status,
      path: request.path,
    });
  }
}
