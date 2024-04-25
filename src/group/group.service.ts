import { Injectable } from '@nestjs/common';
import { GroupEntity } from './group.entity';
import { PrismaService } from '../prisma.service';

@Injectable()
export class GroupService {
  constructor(private prisma: PrismaService) {}

  async findOneById(groupId: number): Promise<GroupEntity> {
    return this.prisma.group.findUnique({
      where: {
        id: groupId,
      },
    });
  }

  async getAll(): Promise<GroupEntity[]> {
    return this.prisma.group.findMany({});
  }
}
