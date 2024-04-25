import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';
export class DisabledTimeEntity {
  @ApiProperty({ example: 23, description: 'Disabled hour' })
  @IsNumber()
  disableHour: number;

  @ApiProperty({
    example: [14, 15, 16, 17],
    description: 'Range of disabled minutes in current hour',
  })
  @IsArray()
  @Type(() => Number)
  disabledMinutes: number[];
}
