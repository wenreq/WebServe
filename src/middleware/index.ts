/*
 * @Author: wenreq 294491328@qq.com
 * @Date: 2023-01-26 09:18:44
 * @LastEditors: wenreq 294491328@qq.com
 * @LastEditTime: 2023-01-26 09:28:07
 * @FilePath: /WebServe/src/middleware/index.ts
 * @Description: 手写一个中间件
 */
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class Logger implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('我是中间件，我来了，嘿嘿嘿！');
    next();
  }
}
