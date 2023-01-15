import { Controller, Get, Post, Body, Response, Render } from '@nestjs/common';

@Controller('user')
export class UserController {
  @Get()
  @Render('default/user')
  index() {
    // 数据可以传到 user.ejs 模版中
    return { name: 'zs' };
  }

  @Post('doAdd')
  doAdd(@Body() body, @Response() res) {
    console.log(body);
    res.redirect('/user');
  }
}
