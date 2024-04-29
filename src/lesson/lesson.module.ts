import { Module } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { LessonController } from './lesson.controller';
import { PrismaService } from '../prisma.service';
import { GroupModule } from 'src/group/group.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { StudentModule } from 'src/student/student.module';

@Module({
  providers: [LessonService, PrismaService],
  controllers: [LessonController],
  exports: [LessonService],
  imports: [GroupModule, MailerModule, StudentModule],
})
export class LessonModule {}
