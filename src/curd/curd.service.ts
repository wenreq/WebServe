import { Injectable } from '@nestjs/common';
import { CreateCurdDto } from './dto/create-curd.dto';
import { UpdateCurdDto } from './dto/update-curd.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Curd } from './entities/curd.entity';
import { Repository, Like } from 'typeorm';
import { Tags } from './entities/tags.entity';

@Injectable()
export class CurdService {
  constructor(
    @InjectRepository(Curd) private readonly curd: Repository<Curd>,
    @InjectRepository(Tags) private readonly tags: Repository<Tags>,
  ) {}

  // 新增
  create(createCurdDto: CreateCurdDto) {
    const data = new Curd();
    data.name = createCurdDto.name;
    data.desc = createCurdDto.desc;
    return this.curd.save(data);
  }

  // 模糊查询
  async findAll(query: { keyword: string; page: number; pageSize: number }) {
    const data = await this.curd.find({
      relations: ['tags'],
      where: {
        name: Like(`%${query.keyword}%`),
      },
      order: {
        id: 'DESC',
      },
      skip: (query.page - 1) * query.pageSize,
      take: query.pageSize,
    });
    const total = await this.curd.count({
      where: {
        name: Like(`%${query.keyword}%`),
      },
    });
    return {
      data,
      total,
    };
  }

  // 更新
  update(id: number, updateCurdDto: UpdateCurdDto) {
    return this.curd.update(id, updateCurdDto);
  }

  // 删除
  remove(id: number) {
    return this.curd.delete(id);
  }

  // 添加tags
  async addTags(params: { tags: string[]; curdId: number }) {
    const userInfo = await this.curd.findOne({ where: { id: params.curdId } });
    const tagsList: Tags[] = [];
    for (let i = 0; i < params.tags.length; i++) {
      const item = new Tags();
      item.name = params.tags[i];
      await this.tags.save(item);
      tagsList.push(item);
    }
    userInfo.tags = tagsList;
    this.curd.save(userInfo);
    return true;
  }
}
