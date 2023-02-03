import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { GuardService } from './guard.service';
import { CreateGuardDto } from './dto/create-guard.dto';
import { UpdateGuardDto } from './dto/update-guard.dto';
import { RoleGuard } from './role.guard';
import { Role, ReqUrl } from './role.decorator'; // 引入自定义装饰器
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@Controller('guard')
// 请求头携带
@ApiBearerAuth()
// swagger 文档分组
@ApiTags('守卫接口')
@UseGuards(RoleGuard)
export class GuardController {
  constructor(private readonly guardService: GuardService) {}

  @Post()
  create(@Body() createGuardDto: CreateGuardDto) {
    return this.guardService.create(createGuardDto);
  }

  @Get()
  // @SetMetadata('role', ['admin']) // 智能守卫
  @Role('admin')
  @ApiOperation({ summary: 'get 接口', description: '守卫模块的get接口' })
  @ApiQuery({ name: 'page', description: '分页信息' })
  @ApiResponse({ status: 403, description: '小黑子我是403' })
  findAll(@ReqUrl('123') url: string) {
    console.log(url);
    return this.guardService.findAll();
  }

  @Get(':id')
  // 描述动态参数
  @ApiParam({ name: 'id', description: '这是一个id', required: true })
  findOne(@Param('id') id: string) {
    return this.guardService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGuardDto: UpdateGuardDto) {
    return this.guardService.update(+id, updateGuardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.guardService.remove(+id);
  }
}
