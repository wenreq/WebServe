import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class CounterMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('已经进入了 Counter 中间件....');
    // 不希望程序继续执行，比如发现了非法访问路径，这时候我们就需要使用res.send( )方法进行拦截。
    // res.send('禁止访问，你被拦截了');
    next();
  }
}
