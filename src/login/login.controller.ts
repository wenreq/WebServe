import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  Session,
} from '@nestjs/common';
import { LoginService } from './login.service';
import { CreateLoginDto } from './dto/create-login.dto';
// 引入管道
import { LoginPipe } from './login.pipe';
import * as svgCaptcha from 'svg-captcha';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  // 生成校验码 /login/code
  @Get('code')
  createCode(@Req() req, @Res() res, @Session() session) {
    const captcha = svgCaptcha.create({
      size: 4, // 生成几个验证码
      fontSize: 50, // 字体大小
      width: 100, // 宽度
      height: 40, // 高度
      background: '#E6E6FA', // 背景色
    });
    session.code = captcha.text;
    res.type('image/svg+xml');
    res.send({
      status: 200,
      success: true,
      data: captcha.data,
    });
  }

  @Post()
  // @Body(LoginPipe)
  create(@Body() createLoginDto: CreateLoginDto) {
    return this.loginService.create(createLoginDto);
  }
}
