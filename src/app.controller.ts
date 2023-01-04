import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * 什么样的东西能叫 Controller？如何使用 ？ 被 @Controller 装饰的类 就是 一个 Controller ，在module中把它倒入到对应的controller中就能够使用它里
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  // 我们可以使用 @Get @Put @Post @Delete 来定义 请求类型。如果你给他传递了参数那么这个参数就是它的路径 如下
  // 结合前面的代码，当我们使用get访问 3000/hello/nihao的时候就能得到 “你好” string的返回
  @Get('/nihao')
  getHello(): string {
    return '你好';
  }
}
