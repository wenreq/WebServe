import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { UserController } from './user/user.controller';

// @Module 装饰器
@Module({
  imports: [ArticleModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}

/**
 * controllers 控制器
 * 控制器负责处理传入的请求并将响应返回给客户端。
 * 控制器的目的是接收应用程序的特定请求。路由机制控制哪个控制器接收哪个请求。通常，每个控制器都有多条路由，不同的路由可以执行不同的动作。
 */
