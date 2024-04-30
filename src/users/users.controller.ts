import { Body, Controller, Post, Request } from '@nestjs/common';
import { UsersService } from './users.service';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { LessonEntity } from 'src/lesson/entity/lesson.entity';

@ApiBearerAuth()
@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  @ApiOperation({ summary: 'Change fullname of current user' })
  @ApiResponse({
    status: 200,
    description: 'Success',
    type: [LessonEntity],
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @Post('fullname')
  getAllByUserId(
    @Request() req: { user: { id: number } },
    @Body() changeFullnamenDto: { fullname: string },
  ) {
    return this.userService.changeFullname(
      req.user.id,
      changeFullnamenDto.fullname,
    );
  }
}
