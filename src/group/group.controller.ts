import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GroupService } from './group.service';
import { GroupEntity } from './group.entity';

@ApiTags('group')
@Controller('group')
export class GroupController {
  constructor(private groupService: GroupService) {}

  @ApiOperation({ summary: 'Get all groups' })
  @ApiResponse({
    status: 200,
    description: 'return group array',
    type: GroupEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @HttpCode(HttpStatus.OK)
  @Get('all')
  getAllGroups() {
    return this.groupService.getAll();
  }
}
