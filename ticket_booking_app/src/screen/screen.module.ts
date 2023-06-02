import { Module } from '@nestjs/common';
import { ScreenController } from './screen.controller';
import { ScreenService } from './screen.service';

@Module({
  controllers: [ScreenController],
  providers: [ScreenService]
})
export class ScreenModule {}
