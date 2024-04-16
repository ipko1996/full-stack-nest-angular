import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from 'src/auth/auth.service';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [UsersService, AuthService],
  controllers: [UsersController],
  exports: [UsersService],
  imports: [JwtModule.register({})],
})
export class UsersModule {}
