import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthEntity } from './auth.entity';
import { UserDto } from '../users/user.dto';
import { Public } from './auth.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({ summary: 'Auth user' })
  @ApiResponse({
    status: 200,
    description: 'Auth',
    type: AuthEntity,
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized',
  })
  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('login')
  signIn(@Body() signInDto: UserDto) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }
}
