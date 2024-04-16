import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/common/dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  login(@Body() userDto: UserDto) {
    return this.authService.login(userDto.username, userDto.password);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('logout')
  logout(@Req() req: Request) {
    return this.authService.logout(req['user'].userId);
  }

  @Post('register')
  register(@Body() createUserDto: UserDto) {
    return this.authService.register(
      createUserDto.username,
      createUserDto.password,
    );
  }

  @UseGuards(AuthGuard('jwt-refresh'))
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const refreshToken = req.headers['authorization']
      .replace('Bearer', '')
      .trim();
    return this.authService.refreshTokens(req['user'].userId, refreshToken);
  }
}
