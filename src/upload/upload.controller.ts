/*
 * @Author: wenreq 294491328@qq.com
 * @Date: 2023-01-26 10:17:00
 * @LastEditors: wenreq 294491328@qq.com
 * @LastEditTime: 2023-01-26 20:30:47
 * @FilePath: /WebServe/src/upload/upload.controller.ts
 * @Description: 文件上传控制器
 */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreateUploadDto } from './dto/create-upload.dto';
import { UpdateUploadDto } from './dto/update-upload.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';
import { zip } from 'compressing';
import { join } from 'path';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  // 文件上传
  @Post('album')
  @UseInterceptors(FileInterceptor('file'))
  upload(@UploadedFile() file) {
    console.log(file, 'file');
    return '上传文件完成了！';
  }

  // 文件下载 - download
  @Get('export')
  downLoad(@Res() res: Response) {
    const url = join(__dirname, '../images/1674700713628.jpeg');
    res.download(url);
  }

  // 文件下载 - stream
  @Get('stream')
  async down(@Res() res: Response) {
    const url = join(__dirname, '../images/1674700713628.jpeg');
    const tarStream = new zip.Stream();
    await tarStream.addEntry(url);
    res.setHeader('Content-type', 'application/octet-stream');
    res.setHeader('Content-type', `attachment; filename=wsc`);
    tarStream.pipe(res);
  }
  // 前端下载相关代码
  /* const useFetch = async (url: string) => {
    const res = await fetch(url).then((res) => res.arrayBuffer());
    const blob = new Blob([res]);
    const Url = URl.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = Url;
    a.download = 'wsc.zip';
    a.click()
  };
  const download = () => {
    useFetch('http://localhost:3000/upload/stream')
  } */

  @Post()
  create(@Body() createUploadDto: CreateUploadDto) {
    return this.uploadService.create(createUploadDto);
  }

  @Get()
  findAll() {
    return this.uploadService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.uploadService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUploadDto: UpdateUploadDto) {
    return this.uploadService.update(+id, updateUploadDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.uploadService.remove(+id);
  }
}
