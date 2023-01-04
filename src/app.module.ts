import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// @Module 装饰器
@Module({
  imports: [],
  controllers: [AppController], // 这个就是哈 把 controller 放在这个里面就好了 通过 @Module 装饰器将元数据附加到模块类中 Nest 可以轻松反射（reflect）出哪些控制器（controller）必须被安装
  providers: [AppService],
})
export class AppModule {}
