import { Module } from '@nestjs/common';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [GroupController],
  providers: [GroupService, PrismaService],
  exports: [GroupService],
})
export class GroupModule {}
