// 根模块用于处理其他类的引用与共享。
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';

// @Module 装饰器
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      host: 'localhost', // 数据库的链接地址host
      port: 3306, // 数据库端口号 3306
      username: 'root', // 链接账号
      password: 'admin123', // 链接密码
      database: 'wenv2_db', // 链接表名
      retryDelay: 5000, // 重试链接数据库间隔
      retryAttempts: 10, // 重连次数
      synchronize: true, // 是否将实体同步到数据库
      autoLoadEntities: true, // 自动加载实体配置，forFeature() 注册的每个实体都自己动加载
    }),
    ArticleModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

/**
 * controllers 控制器
 * 控制器负责处理传入的请求并将响应返回给客户端。
 * 控制器的目的是接收应用程序的特定请求。路由机制控制哪个控制器接收哪个请求。通常，每个控制器都有多条路由，不同的路由可以执行不同的动作。
 */
