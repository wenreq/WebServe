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
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
// 引入 User 实体
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as svgCaptcha from 'svg-captcha';
import * as uuid from 'uuid';

/**
 * 加密处理 - 同步方法
 * bcryptjs.hashSync(data, salt)
 *    - data  要加密的数据
 *    - slat  用于哈希密码的盐。如果指定为数字，则将使用指定的轮数生成盐并将其使用。推荐 10
 */
// const hashPassword = bcryptjs.hashSync(password, 10);

/**
 * 校验 - 使用同步方法
 * bcryptjs.compareSync(data, encrypted)
 *    - data        要比较的数据, 使用登录时传递过来的密码
 *    - encrypted   要比较的数据, 使用从数据库中查询出来的加密过的密码
 */
// const isOk = bcryptjs.compareSync(password, encryptPassword);

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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  // 注册接口定义
  @ApiTags('守卫接口') // swagger 文档分组
  @ApiOperation({ summary: '注册用户' })
  @ApiResponse({ status: 201, type: [User] })
  // 1. 隐藏 password
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('register')
  register(@Body() createUser: CreateUserDto) {
    console.log(createUser);
    return this.userService.register(createUser);
  }
}
