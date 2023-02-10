// 根模块用于处理其他类的引用与共享。
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
// 块级模块
import { ComponentsModule } from './components/components.module';
// 全局模块
import { ConfigModule } from './config/config.module';
import { UploadModule } from './upload/upload.module';
import { LoginModule } from './login/login.module';
import { SpiderModule } from './spider/spider.module';
import { GuardModule } from './guard/guard.module';
import { TestModule } from './test/test.module';
import { AuthModule } from './auth/auth.module';
import { CurdModule } from './curd/curd.module';

// @Module 装饰器
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql', // 数据库类型
      host: 'localhost', // 数据库的连接地址host
      port: 3306, // 端口号 3306
      username: 'root', // 账号
      password: 'admin123', // 密码
      database: 'wenv2_db', // 库名
      // entities: [__dirname + '/**/*.entity{.ts, .js}'], // 实体文件
      retryDelay: 5000, // 重试连接数据库间隔
      retryAttempts: 10, // 重试连接数据库次数
      synchronize: true, // 是否自动将实体类同步到数据库；开发环境true，生产环境建议关闭。
      autoLoadEntities: true, // 自动加载实体配置，forFeature() 注册的每个实体都自己动态加载
    }),
    ArticleModule,
    UserModule,
    ComponentsModule,
    // ConfigModule, // 全局模块
    ConfigModule.forRoot('有限责任公司'),
    UploadModule,
    LoginModule,
    SpiderModule,
    GuardModule,
    TestModule,
    AuthModule,
    CurdModule,
  ],
  controllers: [AppController],
  // services 自定义名称和自定义值
  providers: [
    {
      provide: 'ABC',
      useClass: AppService,
    },
    {
      provide: 'Test',
      useValue: ['TB', 'JD', 'PDD'],
    },
  ],
})
export class AppModule {}

/**
 * controllers 控制器
 * 控制器负责处理传入的请求并将响应返回给客户端。
 * 控制器的目的是接收应用程序的特定请求。路由机制控制哪个控制器接收哪个请求。通常，每个控制器都有多条路由，不同的路由可以执行不同的动作。
 */
