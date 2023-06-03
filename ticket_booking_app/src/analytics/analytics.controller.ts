import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Get('profit')
  async calculateProfit(
    @Query('method') method: string,
    @Query('movie') movie: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    let profit: any[];

    if (method === 'db-aggregation') {
      // Calculate profit using DB aggregation
      profit = await this.analyticsService.calculateProfitByDBAggregation(
        movie,
        startDate,
        endDate,
      );
    } else {
      // Calculate profit using JS algorithms
      profit = await this.analyticsService.calculateProfitByJSAlgorithms(
        movie,
        startDate,
        endDate,
      );
    }

    return profit;
  }

  @Get('visitors')
  async getVisitedAnalytics(
    @Query('method') method: string,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ): Promise<any[]> {
    if (method === 'db-aggregation') {
      return this.analyticsService.calculateVisitsByDBAggregation(
        startDate,
        endDate,
      );
    } else {
      return this.analyticsService.calculateVisitsByJSAlgorithms(
        startDate,
        endDate,
      );
    }
  }
}
