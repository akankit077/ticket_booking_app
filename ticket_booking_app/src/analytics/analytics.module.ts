import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ticket } from 'src/models/ticket.entity';

@Module({
  controllers: [AnalyticsController],
  imports: [TypeOrmModule.forFeature([Ticket])],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}
