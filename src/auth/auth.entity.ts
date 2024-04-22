import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
export class AuthEntity {
  @ApiProperty({ example: 'admin', description: 'Login' })
  @IsString()
  username: string;

  @ApiProperty({
    example: 'Borisov Pavel Alexseevich',
    description: 'Fullname',
  })
  @IsString()
  fullname: string;

  @ApiProperty({
    example: '',
    description: 'token',
  })
  @IsString()
  token: string;
}
