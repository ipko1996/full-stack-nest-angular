import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ZodValidationPipe } from 'nestjs-zod';
import { APP_PIPE } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './common/prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        level: 'trace',
        // stream:
        //   process.env.NODE_ENV === 'production'
        //     ? pino.destination({
        //         dest: '../logs/app.log',
        //         //minLength: 4096,
        //       })
        //     : process.stdout,
        transport: {
          target: 'pino-pretty',
          options: {
            singleLine: true,
            ignore: '',
          },
        },
      },
    }),
    UsersModule,
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot(),
    SharedModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ZodValidationPipe,
    },
  ],
})
export class AppModule {}
