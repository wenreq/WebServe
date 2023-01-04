import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  // https://juejin.cn/post/7078847428455530526
  // const app = await NestFactory.create(AppModule);
  // 一般来说我们选择 NestExpress ，别问为什么 因为网上对这方面的资源多，出bug好找解决方案，而且官方文档有很多例子都是 Express来说的
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(3000);
}
bootstrap();
