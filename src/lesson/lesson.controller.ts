import {
  BadRequestException,
  Controller,
  Delete,
  Get,
  Param,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LessonEntity } from './lesson.entity';
import { LessonService } from './lesson.service';

@ApiBearerAuth()
@ApiTags('lesson')
@Controller('lesson')
export class LessonController {
  constructor(private lessonService: LessonService) {}

  @ApiOperation({ summary: 'Get all lessons by current user' })
  @ApiResponse({
    status: 200,
    description: 'Array of Lessons',
    type: [LessonEntity],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Get('all')
  getAllByUserId(@Request() req: { user: { username: string; id: number } }) {
    return this.lessonService.findAllByUserId(req.user.id);
  }

  @ApiOperation({ summary: 'Get lessons by date and current auth user' })
  @ApiResponse({
    status: 200,
    description: 'Array of Lessons',
    type: [LessonEntity],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Get(':date')
  getByDate(@Request() req, @Param('date') date: string) {
    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!datePattern.test(date)) {
      throw new BadRequestException('Invalid date');
    }
    return this.lessonService.findAllByDate(req.user.id, date);
  }

  @ApiOperation({ summary: 'Delete lesson by id' })
  @ApiResponse({
    status: 200,
    description: 'Success',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Delete(':id')
  deleteById(@Param('id') id: number) {
    return this.lessonService.deleteById(Number(id));
  }
}
