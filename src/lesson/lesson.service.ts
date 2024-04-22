import { Injectable } from '@nestjs/common';
import { GroupService } from 'src/group/group.service';
import { LessonEntity } from 'src/lesson/lesson.entity';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class LessonService {
  constructor(
    private prisma: PrismaService,
    private groupService: GroupService,
  ) {}

  async findAllByDate(
    userId: number,
    date: string,
  ): Promise<LessonEntity[] | undefined> {
    const lessons = await this.prisma.lesson.findMany({
      where: {
        teacher_id: userId,
        date,
      },
    });
    const preparedLessons = await Promise.all(
      lessons.map(async (lesson) => {
        const { name } = await this.groupService.findOneById(lesson.group_id);
        return { ...lesson, group_name: name };
      }),
    );

    return preparedLessons;
  }

  async findAllByUserId(userId: number): Promise<LessonEntity[]> {
    return await this.prisma.lesson.findMany({
      where: {
        teacher_id: userId,
      },
    });
  }
  async deleteById(id: number): Promise<any> {
    return await this.prisma.lesson.delete({
      where: {
        id: id,
      },
    });
  }
}
