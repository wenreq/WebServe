/*
 * @Author: wenreq 294491328@qq.com
 * @Date: 2023-01-25 10:15:09
 * @LastEditors: wenreq 294491328@qq.com
 * @LastEditTime: 2023-01-25 10:38:34
 * @FilePath: /WebServe/src/config/config.module.ts
 * @Description: 全局模块
 */
import { DynamicModule, Global, Module } from '@nestjs/common';

@Global()
@Module({
  // 静态全局模块
  // providers: [
  //   {
  //     provide: 'Config',
  //     useValue: { companyName: '跃龙门科技' },
  //   },
  // ],
  // exports: [
  //   {
  //     provide: 'Config',
  //     useValue: { companyName: '跃龙门科技' },
  //   },
  // ],
})
export class ConfigModule {
  // 动态全局模块
  static forRoot(options: string): DynamicModule {
    return {
      module: ConfigModule,
      providers: [
        {
          provide: 'Config',
          useValue: { companyName: '跃龙门科技' + options },
        },
      ],
      exports: [
        {
          provide: 'Config',
          useValue: { companyName: '跃龙门科技' + options },
        },
      ],
    };
  }
}
