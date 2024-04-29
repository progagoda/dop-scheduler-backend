import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { StudentEntity } from './studentEntity';

@Injectable()
export class StudentService {
  constructor(private prismaService: PrismaService) {}

  async getStudentByGroupId(group_ids: number[]): Promise<StudentEntity[]> {
    return await this.prismaService.student.findMany({
      where: {
        group_id: {
          in: group_ids,
        },
      },
    });
  }
}
