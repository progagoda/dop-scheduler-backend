import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { PrismaService } from '../prisma.service';
import { GroupModule } from 'src/group/group.module';

@Module({
  providers: [LessonService, PrismaService],
  controllers: [LessonController],
  exports: [LessonService],
  imports: [GroupModule],
})
export class LessonModule {}
