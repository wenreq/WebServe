import { Injectable } from '@nestjs/common';
import { CreateSpiderDto } from './dto/create-spider.dto';
import { UpdateSpiderDto } from './dto/update-spider.dto';
import axios from 'axios';
import * as cheerio from 'cheerio';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SpiderService {
  create(createSpiderDto: CreateSpiderDto) {
    return 'This action adds a new spider';
  }

  async findAll() {
    const urls: string[] = [];
    const baseUrl = 'http://www.jpmn5.com';
    const nextText = '下一页';
    let index = 0;
    const getCosPlay = async () => {
      console.log(index);
      const body = await axios
        .get(
          `http://www.jpmn5.com/Cosplay/Cosplay10772${
            index ? '_' + index : ''
          }.html`,
        )
        .then(async (res) => res.data);

      const $ = cheerio.load(body);
      const page = $('.pagination').eq(0).find('a');
      const pageArr = page
        .map(function () {
          return $(this).text();
        })
        .toArray();
      if (pageArr.includes(nextText)) {
        $('.article-content p img').each(function () {
          urls.push(baseUrl + $(this).attr('src'));
        });
        index++;
        await getCosPlay();
      }
    };
    console.log(urls);
    await getCosPlay();
    this.witeFile(urls);
    return `cos`;
  }

  // 写入图片的函数
  witeFile(urls: string[]) {
    urls.forEach(async (url) => {
      const buffer = await axios
        .get(url, { responseType: 'arraybuffer' })
        .then((res) => res.data);
      const ws = fs.createWriteStream(
        path.join('images/cosplay', '/cos' + new Date().getTime() + '.jpg'),
      );
      ws.write(buffer);
    });
  }

  findOne(id: number) {
    return `This action returns a #${id} spider`;
  }

  update(id: number, updateSpiderDto: UpdateSpiderDto) {
    return `This action updates a #${id} spider`;
  }

  remove(id: number) {
    return `This action removes a #${id} spider`;
  }
}
