/*
 * @Author: wenreq 294491328@qq.com
 * @Date: 2023-01-14 22:38:52
 * @LastEditors: wenreq 294491328@qq.com
 * @LastEditTime: 2023-01-25 15:03:15
 * @FilePath: /WebServe/src/article/article.controller.ts
 * @Description: 文章控制器
 */
import { Controller, Get, Param, Inject } from '@nestjs/common';
import { ArticleService } from './article.service';
import { ComponentsService } from '../components/components.service';

// 版本控制开启后，@Controller 需要如下配置。访问也需要加上前缀：localhost:3000/v1/article/test
@Controller({
  path: 'article',
  version: '1',
})
export class ArticleController {
  constructor(
    @Inject('Config') private company: string,
    private readonly articleService: ArticleService,
    private readonly componentsService: ComponentsService,
  ) {}

  @Get('/test')
  test() {
    // return this.componentsService.findAll();
    return this.company;
  }

  @Get('/add')
  addArticle(): any {
    return this.articleService.addArticle();
  }

  @Get('/delete/:id')
  delArticle(@Param() params): any {
    const id: number = parseInt(params.id);
    // {"raw":[],"affected":1}
    return this.articleService.deleteArticle(id);
  }

  @Get('/update/:id')
  updateArticle(@Param() params): any {
    const id: number = parseInt(params.id);
    return this.articleService.updateArticle(id);
  }

  @Get()
  getArticle(): any {
    return this.articleService.getArticle();
  }

  @Get('/findArticleByName/:name')
  getArticleName(@Param() params): any {
    const name: string = params.name;
    return this.articleService.getArticleName(name);
  }

  // 跨域 Demo
  @Get('/corstest')
  corsTest(): object {
    return { message: '测试跨域请求成功' };
  }
}
