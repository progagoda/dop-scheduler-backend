import { Injectable } from '@nestjs/common';
import { GroupService } from 'src/group/group.service';
import { LessonEntity } from 'src/lesson/entity/lesson.entity';
import { PrismaService } from 'src/prisma.service';
import { DisabledTimeEntity } from './entity/disabledTime.entity';
import { DisabledStartTimeDto } from './dto/disabledStartTime.dto';
import * as _ from 'lodash';

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
    const groups = await this.prisma.group.findMany();
    const preparedLessons = await Promise.all(
      lessons.map((lesson) => {
        const { name } = groups.find((group) => group.id == lesson.group_id);
        return { ...lesson, group_name: name };
      }),
    );

    return preparedLessons;
  }

  async findAllByUserId(userId: number): Promise<LessonEntity[]> {
    return this.prisma.lesson.findMany({
      where: {
        teacher_id: userId,
      },
    });
  }

  async deleteById(id: number): Promise<any> {
    return this.prisma.lesson.delete({
      where: {
        id: id,
      },
    });
  }

  async getDisabledStartTime({
    date,
    group_ids,
  }: DisabledStartTimeDto): Promise<DisabledTimeEntity[]> {
    const lessons = await this.prisma.lesson.findMany({
      where: {
        group_id: {
          in: group_ids,
        },
        date: date,
      },
    });
    const rangeTimes = lessons.map((lesson) => ({
      start: lesson.start_time,
      end: lesson.end_time,
    }));

    const disabledRange = _.uniqBy(rangeTimes, 'start');
    const result: DisabledTimeEntity[] = [];
    disabledRange.forEach((value) => {
      const startHour = Number(value.start.split(':')[0]);
      const endHour = Number(value.end.split(':')[0]);
      for (const i of _.range(startHour, endHour + 1)) {
        result.push({
          disableHour: i,
          disabledMinutes: _.range(0, 61),
        });
      }
      for (const i of _.range(0, 8)) {
        result.push({
          disableHour: i,
          disabledMinutes: _.range(0, 61),
        });
      }
    });

    return _.sortBy(_.uniqBy(result, 'disableHour'), 'disableHour');
  }
}
