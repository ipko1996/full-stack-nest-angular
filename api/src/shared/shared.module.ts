import { Module } from '@nestjs/common';
import { AccessContorlService } from './access-control.service';

@Module({
  imports: [],
  controllers: [],
  providers: [AccessContorlService],
  exports: [],
})
export class SharedModule {}
