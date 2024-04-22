import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class UserEntity {
  @ApiProperty({ example: 1, description: 'Id of user' })
  @IsNumber()
  id: number;

  @ApiProperty({ example: 'admin', description: 'User login' })
  @IsString()
  username: string;

  @ApiProperty({ example: '123', description: 'User password' })
  @IsString()
  password: string;

  @ApiProperty({
    example: 'Antoshin Pavel Kirovsky',
    description: 'User fullname',
  })
  @IsString()
  fullname: string;
}
