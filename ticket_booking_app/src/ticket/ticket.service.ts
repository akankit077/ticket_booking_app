import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Ticket } from 'src/models/ticket.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TicketService {
  constructor(
    @InjectRepository(Ticket)
    private ticketRepository: Repository<Ticket>,
  ) {}

  async createTicket(ticketData: Partial<Ticket>): Promise<Ticket> {
    const ticket = this.ticketRepository.create(ticketData);
    return this.ticketRepository.save(ticket);
  }

  async getTicketById(id: number): Promise<Ticket> {
    return this.ticketRepository.findOne({ where: { id } });
  }

  async getAllTickets(): Promise<Ticket[]> {
    return this.ticketRepository.find();
  }

  async updateTicket(
    ticketId: number,
    ticketData: Partial<Ticket>,
  ): Promise<Ticket> {
    const ticket = await this.getTicketById(ticketId);
    if (!ticket) {
      // Handle ticket not found
    }

    Object.assign(ticket, ticketData);
    return this.ticketRepository.save(ticket);
  }

  async deleteTicket(ticketId: number): Promise<void> {
    const ticket = await this.getTicketById(ticketId);
    if (!ticket) {
      // Handle ticket not found
    }

    await this.ticketRepository.remove(ticket);
  }
}
