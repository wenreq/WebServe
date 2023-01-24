/*
 * @Author: wenreq 294491328@qq.com
 * @Date: 2023-01-14 17:20:45
 * @LastEditors: wenreq 294491328@qq.com
 * @LastEditTime: 2023-01-24 21:11:00
 * @FilePath: /WebServe/src/main.ts
 * @Description: 入口js文件
 */
// 应用程序入口文件。它使用 NestFactory 用来创建 Nest 应用实例。
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// 平台：将平台的 application 接口暴露出来 NestExpressApplication
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cors from 'cors';

function MiddleWareAll(req: any, res: any, next: any) {
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
  app.useStaticAssets(join(__dirname, '..', 'public'), {
    prefix: '/static/', // 设置虚拟路径
  });

  // 注意首先必须安装模版引擎 yarn add ejs -D
  app.setBaseViewsDir('views');
  app.setViewEngine('ejs');

  // 注册跨域的第三方中间件
  app.use(cors());
  // 注册全局中间件
  app.use(MiddleWareAll);
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
