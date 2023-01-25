/*
 * @Author: wenreq 294491328@qq.com
 * @Date: 2023-01-14 17:20:45
 * @LastEditors: wenreq 294491328@qq.com
 * @LastEditTime: 2023-01-25 10:06:49
 * @FilePath: /WebServe/src/article/article.module.ts
 * @Description: 文章模块
 */
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';
// 引入中间件
import { CounterMiddleware } from '../counter/counter.middleware';
// 引入 components 服务
import { ComponentsService } from '../components/components.service';

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [ArticleController],
  providers: [ComponentsService, ArticleService],
})
// 在 ArticleModule 的类上,实现 NestModule 接口
export class ArticleModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // 指定拦截请求类型 method: RequestMethod.GET
    consumer
      .apply(CounterMiddleware)
      .forRoutes({ path: 'article', method: RequestMethod.GET });
  }
}
