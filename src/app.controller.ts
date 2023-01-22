// 常见功能是用来处理 http 请求以及调用 service 层的处理方法
import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

/**
 * 为了创建一个基本的控制器，我们使用类(class)和装饰器(@Controller)。装饰器将类与所需的元数据相关联，并使Nest能够创建路由映射(将请求绑定到相应的控制器上)。
 * 为了快速创建一个内置验证的CRUD控制器，你可以使用CLI的CRUD生成器：nest g resource [name]
 */
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('default/index')
  getIndex() {
    return { name: 'wen', age: 28 };
  }

  // 我们可以使用 @Get @Put @Post @Delete 来定义 请求类型。如果你给他传递了参数那么这个参数就是它的路径 如下
  // 结合前面的代码，当我们使用get访问 3000/hello/nihao的时候就能得到 “你好” string的返回
  @Get('/nihao')
  getHello(): string {
    // return this.appService.getHello();
    return '你好';
  }

  @Get('/getTest')
  getTest(): string {
    return '测试';
  }
}
