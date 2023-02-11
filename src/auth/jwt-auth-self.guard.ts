import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthSelfGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext) {
    return super.canActivate(context);
  }

  handleRequest(err, user, info) {
    if (info && info.name === 'TokenExpiredError') {
      throw new HttpException('Token过期', 407);
    }
    if (err || !user) {
      throw new HttpException('身份验证失败', HttpStatus.BAD_REQUEST);
      // throw err;
    }
    return user;
  }
}
