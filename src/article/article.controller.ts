/*
 * @Author: wenreq 294491328@qq.com
 * @Date: 2023-01-14 22:38:52
 * @LastEditors: wenreq 294491328@qq.com
 * @LastEditTime: 2023-01-24 21:08:33
 * @FilePath: /WebServe/src/article/article.controller.ts
 * @Description: 文章控制器
 */
import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

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

  // @Post()
  // create(@Body() createArticleDto: CreateArticleDto) {
  //   return this.articleService.create(createArticleDto);
  // }

  // @Get()
  // findAll() {
  //   return this.articleService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.articleService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
  //   return this.articleService.update(+id, updateArticleDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.articleService.remove(+id);
  // }
}
