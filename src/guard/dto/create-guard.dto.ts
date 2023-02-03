import { ApiProperty } from '@nestjs/swagger';

export class CreateGuardDto {
  @ApiProperty({ example: 'wen' })
  name: string;
  @ApiProperty({ example: '28' })
  age: number;
}
