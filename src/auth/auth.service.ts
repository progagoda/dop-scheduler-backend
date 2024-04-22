import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { AuthEntity } from './auth.entity';
import { UserEntity } from 'src/users/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, password: string): Promise<AuthEntity> {
    const user: UserEntity = await this.usersService.findOne(username);

    if (user?.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { id: user.id, username };

    return {
      username: user.username,
      fullname: user.fullname,
      token: await this.jwtService.signAsync(payload),
    };
  }
}
