import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserDto } from '../common/dto';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/auth/auth.service';
import { Roles } from 'src/decorators/roles/roles.decorator';
import { Role } from '@prisma/client';
import { RoleGuard } from 'src/guards/role/role.guard';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Post()
  @UseGuards(AuthGuard(['jwt']))
  async create(@Body() createUserDto: UserDto) {
    return this.authService.register(
      createUserDto.username,
      createUserDto.password,
      false, // Don't add refresh token
    );
  }

  @Roles(Role.ADMIN)
  @UseGuards(AuthGuard(['jwt']), RoleGuard)
  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(AuthGuard(['jwt']))
  @Get(':username')
  async findUserByUsername(@Param('username') username: string) {
    const user = await this.usersService.findByUsername(username);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  @UseGuards(AuthGuard(['jwt']))
  @Delete(':userId')
  remove(@Param('userId') userId: string) {
    return this.usersService.remove(userId);
  }
}
