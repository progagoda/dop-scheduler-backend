import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class LessonEntity {
  @ApiProperty({ example: 'OPD', description: 'Name of lesson' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 1,
    description: 'Id of the teacher',
  })
  @IsNumber()
  teacher_id: number;

  @ApiProperty({ example: '2024-04-22', description: 'Date of the lesson' })
  @IsString()
  date: string;

  @ApiProperty({ example: '1', description: 'Id of group' })
  @IsNumber()
  group_id: number;

  @ApiProperty({ example: 'P34131', description: 'Name of the group' })
  @IsString()
  group_name?: string;

  @ApiProperty({ example: '18:00', description: 'Start of lesson time' })
  @IsString()
  start_time: string;

  @ApiProperty({ example: '18:30', description: 'End of lesson time' })
  @IsString()
  end_time: string;

  @ApiProperty({
    example: 'Kronversky 14, 1444 room',
    description: 'The address of the lesson',
  })
  @IsString()
  location?: string;

  @ApiProperty({
    example:
      'https://itmo.zoom.us/j/89386858619?pwd=MjU4VkJGM0RmaTVHT0ZIcFpDYXFSUT09#success',
    description: 'Zoom link',
  })
  @IsString()
  zoom_link?: string;
}
