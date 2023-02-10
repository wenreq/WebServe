import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { ApiBody, ApiOperation, ApiTags } from '@nestjs/swagger';
import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Headers,
  Session,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import * as svgCaptcha from 'svg-captcha';

@ApiTags('获取验证码/登录/验证')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: '登录' })
  @UseGuards(AuthGuard('local'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post('login')
  async login(@Body() Body: LoginDto, @Session() session, @Req() req) {
    if (session.code.toLocaleLowerCase() === Body?.code?.toLocaleLowerCase()) {
      return await this.authService.login(req.user);
    } else {
      throw new HttpException('请检查验证码！', HttpStatus.BAD_REQUEST);
    }
  }

  // 生成校验码 /auth/code
  @ApiOperation({ summary: '获取验证码' })
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
}
