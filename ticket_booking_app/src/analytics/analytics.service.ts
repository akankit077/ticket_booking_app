import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from 'src/models/ticket.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectRepository(Ticket)
    private readonly ticketRepository: Repository<Ticket>,
  ) {}

  async calculateVisitsByDBAggregation(
    startDate: string,
    endDate: string,
  ): Promise<any[]> {
    const queryBuilder = this.ticketRepository
      .createQueryBuilder('ticket')
      .select("to_char(ticket.movieTime, 'Month')", 'month')
      .addSelect('SUM(ticket.numOfSeats)', 'summaryVisits')
      .where('ticket.movieTime BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .groupBy('month')
      .orderBy('month');

    const result = await queryBuilder.getRawMany();

    return result;
  }

  async calculateVisitsByJSAlgorithms(
    startDate: string,
    endDate: string,
  ): Promise<any[]> {
    const tickets = await this.ticketRepository.find({
      where: {
        movieTime: Between(new Date(startDate), new Date(endDate)),
      },
    });

    const visitsByMonths: { month: string; summaryVisits: number }[] = [];
    const monthMap: { [key: string]: number } = {};

    tickets.forEach((ticket) => {
      const month = ticket.movieTime.toLocaleString('en-US', { month: 'long' });

      if (!monthMap[month]) {
        monthMap[month] = 0;
      }

      monthMap[month] += ticket.numOfSeats;
    });

    for (const month in monthMap) {
      visitsByMonths.push({ month, summaryVisits: monthMap[month] });
    }

    return visitsByMonths;
  }

  async calculateProfitByDBAggregation(
    movie: string,
    startDate: string,
    endDate: string,
  ): Promise<any[]> {
    // Perform DB aggregation to calculate profit
    const profit = await this.ticketRepository
      .createQueryBuilder('ticket')
      .select("to_char(ticket.creationDate, 'Month')", 'month')
      .addSelect('SUM(ticket.totalPrice)', 'summaryProfit')
      .where('ticket.movieTitle = :movie', { movie })
      .andWhere('ticket.creationDate >= :startDate', { startDate })
      .andWhere('ticket.creationDate <= :endDate', { endDate })
      .groupBy("to_char(ticket.creationDate, 'Month')")
      .getRawMany();

    return profit;
  }

  async calculateProfitByJSAlgorithms(
    movie: string,
    startDate: string,
    endDate: string,
  ): Promise<any[]> {
    Logger.log(startDate);
    const tickets = await this.ticketRepository.find({
      where: {
        movieTitle: movie,
        creationDate: Between(new Date(startDate), new Date(endDate)),
      },
    });

    const profitByMonth: { [month: string]: number } = {};

    tickets.forEach((ticket) => {
      const month = ticket.creationDate.toLocaleString('default', {
        month: 'long',
      });

      if (!profitByMonth[month]) {
        profitByMonth[month] = 0;
      }

      profitByMonth[month] += ticket.totalPrice;
    });

    const result = Object.keys(profitByMonth).map((month) => ({
      month,
      summaryProfit: profitByMonth[month],
    }));

    return result;
  }
}
