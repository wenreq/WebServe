/*
 * @Author: wenreq 294491328@qq.com
 * @Date: 2023-01-14 17:20:45
 * @LastEditors: wenreq 294491328@qq.com
 * @LastEditTime: 2023-01-29 15:10:15
 * @FilePath: /WebServe/src/main.ts
 * @Description: 入口js文件
 */
// 应用程序入口文件。它使用 NestFactory 用来创建 Nest 应用实例。
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// 平台：将平台的 application 接口暴露出来 NestExpressApplication
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { VersioningType } from '@nestjs/common';
import * as cors from 'cors'; // 跨域
import * as session from 'express-session';
import { Request, Response, NextFunction, application } from 'express';
import { ResponseInterceptor } from './common/response'; // 全局响应拦截
import { HttpFilter } from './common/filter'; // 全局异常拦截
import { ValidationPipe } from '@nestjs/common';

function MiddleWareAll(req: Request, res: Response, next: NextFunction) {
  console.log(req.originalUrl);
  console.log('我是全局中间件....');
  next();
}

// 异步函数：启动应用程序
async function bootstrap() {
  // https://juejin.cn/post/7078847428455530526
  // const app = await NestFactory.create(AppModule);
  // 一般来说我们选择 NestExpress ，别问为什么 因为网上对这方面的资源多，出bug好找解决方案，而且官方文档有很多例子都是 Express来说的
  // NestFactory 暴露了一些静态方法用于创建应用程序的实例。其中，create() 方法返回一个应用程序的对象，该对象实现了 INestApplication 接口。
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  // app.useStaticAssets('public'); // 配置静态资源目录
  // // 配置虚拟目录
  // app.useStaticAssets('public', {
  //   prefix: '/static/',
  // });
  // 配置静态资源目录；访问：http://localhost:3000/static/1674700713628.jpeg
  app.useStaticAssets(join(__dirname, '..', 'images'), {
    prefix: '/static/', // 设置虚拟路径
  });

  // 注意首先必须安装模版引擎 yarn add ejs -D
  app.setBaseViewsDir('views');
  app.setViewEngine('ejs');

  // 注册跨域的第三方中间件
  app.use(cors());
  // 注册全局中间件
  app.use(MiddleWareAll);

  // 开启版本控制前缀
  app.enableVersioning({
    type: VersioningType.URI,
  });

  console.log(session);
  /**
   * secret：生成服务端 session 签名 可理解为加盐
   * name：生成客户端 cookie 的名字 默认 connect.sid
   * rolling：在每次请求时强制设置 cookie，这将重置 cookie 过期时间（默认：false）
   * cookie：设置返回到前端 key 的属性，默认值为：{ path: '/', httpOnly: true, secure: false, maxAge:null }
   */
  app.use(
    session({
      secret: 'wenshaochang',
      name: 'wsc',
      rolling: true,
      cookie: { maxAge: null },
    }),
  );

  // 异常拦截器
  app.useGlobalFilters(new HttpFilter());
  // 响应拦截器
  app.useGlobalInterceptors(new ResponseInterceptor());

  // nest 校验管道
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
