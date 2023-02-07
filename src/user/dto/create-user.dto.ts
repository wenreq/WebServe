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
  @IsString()
  username: string;
  // @IsNotEmpty({
  //   message: '不能为空',
  // })
  // @IsNumber()
  // password: string;
  @IsString()
  password: string;
}
