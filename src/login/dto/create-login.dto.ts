/*
 * @Author: wenreq 294491328@qq.com
 * @Date: 2023-01-29 11:36:00
 * @LastEditors: wenreq 294491328@qq.com
 * @LastEditTime: 2023-01-29 14:28:35
 * @FilePath: \WebServe\src\login\dto\create-login.dto.ts
 * @Description: 用户模块定义的字段类型
 */
import { Length, IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateLoginDto {
  @IsNotEmpty({
    message: '不能为空',
  })
  @IsString({
    message: 'name必须为字符串',
  })
  @Length(5, 10, {
    message: '不能超过十个字符',
  })
  name: string;
  @IsNumber()
  age: number;
}
