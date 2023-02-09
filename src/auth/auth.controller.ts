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

@ApiTags('验证')
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
}
