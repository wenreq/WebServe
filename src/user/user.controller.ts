/*
 * @Author: wenreq 294491328@qq.com
 * @Date: 2023-01-22 10:27:30
 * @LastEditors: wenreq 294491328@qq.com
 * @LastEditTime: 2023-01-28 12:25:12
 * @FilePath: /WebServe/src/user/user.controller.ts
 * @Description: user controller
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
  Req,
  Res,
  Session,
  ParseIntPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha';
import * as uuid from 'uuid';

console.log(uuid.v4());
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 生成校验码 /user/code
  @Get('code')
  createCode(@Req() req, @Res() res, @Session() session) {
    const captcha = svgCaptcha.create({
      size: 4, // 生成几个验证码
      fontSize: 50, // 字体大小
      width: 100, // 宽度
      height: 34, // 高度
      background: '#cc9966', // 背景色
    });
    session.data = captcha.text;
    res.type('image/svg+xml');
    res.send(captcha.data);
  }

  // 提交校验校验码 /user/login
  @Post('login')
  login(@Body() Body, @Session() session) {
    console.log(Body, session.code); // { name: 'admin', password: '123456', code: '2233'}, teTz
    if (session.code.toLocaleLowerCase() === Body?.code?.toLocaleLowerCase()) {
      return {
        code: 200,
        message: '验证码正确',
      };
    } else {
      return {
        code: 200,
        message: '验证码错误',
      };
    }
  }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  // 单个版本控制前缀 http://localhost:3000/v1/user
  @Version('1')
  findAll() {
    return this.userService.findAll();
  }

  // 管道
  @Get(':id')
  // http://localhost:3000/user/36170b71-66f3-47e3-b4a5-5dbdc20bd889
  findOne(@Param('id', ParseUUIDPipe) id: number) {
    console.log(typeof id, '===========>');
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
