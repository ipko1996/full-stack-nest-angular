import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AtStragety, RtStragety } from './strategies';
import { UsersService } from 'src/users/users.service';

@Module({
  providers: [AuthService, AtStragety, RtStragety, UsersService],
  controllers: [AuthController],
  imports: [JwtModule.register({})],
})
export class AuthModule {}
