import { Injectable } from '@nestjs/common';
import { CreateCurdDto } from './dto/create-curd.dto';
import { UpdateCurdDto } from './dto/update-curd.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Curd } from './entities/curd.entity';
import { Repository, Like } from 'typeorm';

@Injectable()
export class CurdService {
  constructor(
    @InjectRepository(Curd) private readonly curd: Repository<Curd>,
  ) {}

  // 新增
  create(createCurdDto: CreateCurdDto) {
    const data = new Curd();
    data.name = createCurdDto.name;
    data.desc = createCurdDto.desc;
    return this.curd.save(data);
  }

  // 模糊查询
  findAll(query: { keyword: string }) {
    return this.curd.find({
      where: {
        name: Like(`%${query.keyword}%`),
      },
    });
  }

  // 更新
  update(id: number, updateCurdDto: UpdateCurdDto) {
    return this.curd.update(id, updateCurdDto);
  }

  // 删除
  remove(id: number) {
    return this.curd.delete(id);
  }
}
