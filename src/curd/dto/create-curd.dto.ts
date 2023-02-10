import { IsNotEmpty } from 'class-validator';

export class CreateCurdDto {
  @IsNotEmpty({ message: '名称不能为空' })
  name: string;

  @IsNotEmpty({ message: '描述不能为空' })
  desc: string;
}
