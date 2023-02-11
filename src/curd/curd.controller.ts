import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CurdService } from './curd.service';
import { CreateCurdDto } from './dto/create-curd.dto';
import { UpdateCurdDto } from './dto/update-curd.dto';

@Controller('curd')
export class CurdController {
  constructor(private readonly curdService: CurdService) {}

  @Post()
  create(@Body() createCurdDto: CreateCurdDto) {
    return this.curdService.create(createCurdDto);
  }

  @Get()
  findAll(@Query() query: { keyword: string; page: number; pageSize: number }) {
    return this.curdService.findAll(query);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCurdDto: UpdateCurdDto) {
    return this.curdService.update(+id, updateCurdDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.curdService.remove(+id);
  }

  @Post('/add/tags')
  addTags(@Body() params: { tags: string[]; curdId: number }) {
    return this.curdService.addTags(params);
  }
}
