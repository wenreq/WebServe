/*
 * @Author: wenreq 294491328@qq.com
 * @Date: 2023-01-22 10:27:30
 * @LastEditors: wenreq 294491328@qq.com
 * @LastEditTime: 2023-01-28 12:25:12
 * @FilePath: /WebServe/src/user/user.controller.ts
 * @Description: user controller
 */
import {
  UseGuards,
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
import * as uuid from 'uuid';
import { AuthGuard } from '@nestjs/passport';

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

// console.log(uuid.v4());
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // 提交校验校验码 /user/login
  @Post('login')
  login(@Body() Body, @Session() session) {
    // console.log(Body, session.code); // { name: 'admin', password: '123456', code: '2233'}, teTz
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

  @ApiOperation({ summary: '获取用户信息' })
  @ApiBearerAuth() // swagger文档设置token
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  getUserInfo(@Req() req) {
    return req.user;
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
    return this.userService.register(createUser);
  }
}
