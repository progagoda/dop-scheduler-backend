import { Injectable } from '@nestjs/common';
import { GroupService } from 'src/group/group.service';
import { LessonEntity } from 'src/lesson/entity/lesson.entity';
import { PrismaService } from '../prisma.service';
import { DisabledTimeEntity } from './entity/disabledTime.entity';
import { DisabledStartTimeDto } from './dto/disabledStartTime.dto';
import * as _ from 'lodash';
import { CreateLessonDto } from './dto/createLessonDto';
import { MailerService } from 'src/mailer/mailer.service';
import { EmailDto } from 'src/mailer/emailDto';
import { StudentService } from 'src/student/student.service';

@Injectable()
export class LessonService {
  constructor(
    private prisma: PrismaService,
    private groupService: GroupService,
    private mailerService: MailerService,
    private studentService: StudentService,
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
    return _.sortBy(preparedLessons, 'start_time');
  }

  async findAllByUserId(userId: number): Promise<LessonEntity[] | undefined> {
    const allLessons = await this.prisma.lesson.findMany({
      where: {
        teacher_id: userId,
      },
    });
    return _.sortBy(allLessons, 'start_time');
  }

  async create(
    createLessonDto: CreateLessonDto,
    teacher: { id: number; username: string; fullname: string },
  ): Promise<void> {
    createLessonDto.group_ids.map(async (group) => {
      const buildObject = {
        name: createLessonDto.name,
        teacher_id: teacher.id,
        date: createLessonDto.date,
        start_time: createLessonDto.start_time,
        end_time: createLessonDto.end_time,
        group_id: group,
        location: createLessonDto?.location || '',
        zoom_link: createLessonDto?.zoom_link || '',
      };
      const students = await this.studentService.getStudentByGroupId(
        createLessonDto.group_ids,
      );
      const recipients = students.map((student) => ({
        name: student.name,
        address: student.email,
      }));
      const emailDto: EmailDto = {
        from: {
          name: teacher.fullname,
          address: `${teacher.username}@gmail.com`,
        },
        recipients: recipients,
        subject: createLessonDto.name,
        html: `Привет! ${createLessonDto.date} с ${createLessonDto.start_time} 
        до ${createLessonDto.end_time} пройдет занятие по ${createLessonDto.name}.
        Место: ${createLessonDto.location ?? createLessonDto.zoom_link} `,
      };
      await this.mailerService.sendEmail(emailDto);
      return await this.prisma.lesson.create({
        data: buildObject,
      });
    });
  }

  async deleteById(id: number): Promise<LessonEntity> {
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
