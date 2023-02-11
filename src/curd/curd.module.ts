import { Module } from '@nestjs/common';
import { CurdService } from './curd.service';
import { CurdController } from './curd.controller';
// 引入实体类
import { Curd } from './entities/curd.entity';
import { Tags } from './entities/tags.entity';
// 引入 TypeOrmModule
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Curd, Tags])],
  controllers: [CurdController],
  providers: [CurdService],
})
export class CurdModule {}
