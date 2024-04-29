import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  providers: [StudentService, PrismaService],
  exports: [StudentService],
})
export class StudentModule {}
