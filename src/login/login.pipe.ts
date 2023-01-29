/*
 * @Author: wenreq 294491328@qq.com
 * @Date: 2023-01-29 11:40:52
 * @LastEditors: wenreq 294491328@qq.com
 * @LastEditTime: 2023-01-29 15:14:58
 * @FilePath: \WebServe\src\login\login.pipe.ts
 * @Description: 登录的Pipe模块
 */
import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class LoginPipe implements PipeTransform {
  async transform(value: any, metadata: ArgumentMetadata) {
    const DTO = plainToInstance(metadata.metatype, value); // 将参数反射到类上面
    const errors = await validate(DTO);
    console.log(errors);
    if (errors.length > 0) {
      throw new HttpException(errors, HttpStatus.BAD_REQUEST);
    }
    return value;
  }
}
