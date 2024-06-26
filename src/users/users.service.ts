import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(username: string): Promise<User | undefined> {
    return this.prisma.user.findFirst({
      where: {
        username: username,
      },
    });
  }

  async changeFullname(
    user_id: number,
    fullname: string,
  ): Promise<User | undefined> {
    return this.prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        fullname: fullname,
      },
    });
  }
}
