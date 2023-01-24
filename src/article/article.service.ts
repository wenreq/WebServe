/*
 * @Author: wenreq 294491328@qq.com
 * @Date: 2023-01-14 17:20:45
 * @LastEditors: wenreq 294491328@qq.com
 * @LastEditTime: 2023-01-24 19:59:16
 * @FilePath: /WebServe/src/article/article.service.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

import { Like, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './entities/article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private readonly article: Repository<Article>,
  ) {}

  // 增加
  addArticle() {
    const data = new Article();
    data.title = '2023年春节档电影票房统计';
    data.content =
      '据灯塔专业版官方数据，截至1月23日6时16分，2023年春节档（1月21日-1月27日）总票房（含预售）破19亿！《流浪地球2》票房达6.27亿元，票房第一。《满江红》5.72亿元紧跟其后。《无名》2.2亿元票房位居第三。';
    data.state = '发布';
    data.is_delete = 0;
    data.pub_date = new Date();
    data.cover_img = '';
    return this.article.save(data);
  }

  // 删除
  deleteArticle(id: number) {
    return this.article.delete(id);
  }

  // 修改
  updateArticle(id: number) {
    const data = new Article();
    data.title = '2023年春节档票房破19亿！！';
    return this.article.update(id, data);
  }

  // 查询
  getArticle() {
    return this.article.find();
  }

  // 根据字段进行模糊查询
  getArticleName(name: string) {
    return this.article.find({
      where: {
        title: Like(`%${name}%`),
      },
    });
  }

  create(createArticleDto: CreateArticleDto) {
    return 'This action adds a new article';
  }

  findAll() {
    return `This action returns all article`;
  }

  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
