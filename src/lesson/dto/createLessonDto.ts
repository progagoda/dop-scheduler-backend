import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLessonDto {
  @ApiProperty({
    example: 'OPD/PVS/Rubezh',
    description: 'Name of planning lesson',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '2024-04-23',
    description: 'date of planning lesson',
  })
  @IsString()
  date: string;

  @ApiProperty({
    example: '18:00',
    description: 'Start time of planning lesson',
  })
  @IsString()
  start_time: string;

  @ApiProperty({
    example: '19:30',
    description: 'End time of planning lesson',
  })
  @IsString()
  end_time: string;

  @ApiProperty({
    example: 'Kronversky',
    description: 'Location of planning lesson',
  })
  @IsString()
  location?: string;

  @ApiProperty({
    example: 'https://itmo.zoom.us/j/',
    description: 'Zoom link of planning lesson',
  })
  @IsString()
  zoom_link?: string;

  @ApiProperty({
    example: [1, 2],
    description: 'Groups ids array',
  })
  @IsArray()
  @Type(() => Number)
  group_ids: number[];
}
