import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({ example: 'admin', description: 'User login' })
  @IsString()
  username: string;

  @ApiProperty({ example: '123', description: 'User password' })
  @IsString()
  password: string;
}
