import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class StudentEntity {
  @ApiProperty({ example: 'Alexander', description: 'Name of student' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'alexander@gmail.com',
    description: 'Mail of student',
  })
  @IsString()
  email: string;

  @ApiProperty({ example: '1', description: 'Id of group' })
  @IsNumber()
  group_id: number;
}
