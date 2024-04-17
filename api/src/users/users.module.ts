import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { AccessContorlService } from 'src/shared/access-control.service';

@Module({
  providers: [UsersService, AuthService, AccessContorlService],
  controllers: [UsersController],
  exports: [UsersService],
  imports: [JwtModule.register({})],
})
export class UsersModule {}
