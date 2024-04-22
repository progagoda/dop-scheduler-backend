import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthEntity {
  @ApiProperty({ example: 'admin', description: 'User login' })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1Ni',
    description: 'User auth token',
  })
  @IsString()
  token: string;

  @ApiProperty({
    example: 'Antoshin Pavel Kirovsky',
    description: 'User fullname',
  })
  @IsString()
  fullname: string;
}
