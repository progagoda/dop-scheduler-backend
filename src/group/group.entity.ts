import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class GroupEntity {
  @ApiProperty({ example: '1', description: 'Id of group' })
  @IsNumber()
  id: number;

  @ApiProperty({
    example: 'P34111',
    description: 'Name or number of group',
  })
  @IsString()
  name: string;
}
