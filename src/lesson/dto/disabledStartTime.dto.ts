import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class DisabledStartTimeDto {
  @ApiProperty({
    example: '2024-04-23',
    description: 'Date of planning lesson',
  })
  @IsString()
  date: string;

  @ApiProperty({
    example: [14, 15, 16, 17],
    description: 'Range of disabled minutes in current hour',
  })
  @IsArray()
  @Type(() => Number)
  group_ids: number[];
}
