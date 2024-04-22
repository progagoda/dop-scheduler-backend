import { Injectable } from '@nestjs/common';
import { GroupEntity } from './group.entity';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async findOneById(groupId: number): Promise<GroupEntity | undefined> {
    return this.prisma.group.findUnique({
      where: {
        id: groupId,
      },
    });
  }
}
