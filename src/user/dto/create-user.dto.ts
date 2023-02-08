import { Length, IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateUserDto {
  // @IsNotEmpty({
  //   message: '不能为空',
  // })
  // @IsString({
  //   message: 'name必须为字符串',
  // })
  // @Length(3, 10, {
  //   message: '必须是三到十位字符',
  // })
  @IsNotEmpty({
    message: '账号不能为空',
  })
  @IsString()
  username: string;
  // @IsNotEmpty({
  //   message: '不能为空',
  // })
  // @IsNumber()
  // password: string;
  @IsNotEmpty({
    message: '密码不能为空',
  })
  @IsString()
  @Length(6, 12, {
    message: '密码长度在 2 到 12 个字符',
  })
  password: string;
}
