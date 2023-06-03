import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { TicketService } from './ticket.service';
import { Ticket } from 'src/models/ticket.entity';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('tickets')
export class TicketController {
  constructor(private ticketService: TicketService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UsePipes(new ValidationPipe())
  async createTicket(
    @Body() createTicketDto: CreateTicketDto,
  ): Promise<Ticket> {
    return this.ticketService.createTicket(createTicketDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getTicketById(
    @Param('id', ParseIntPipe) ticketId: number,
  ): Promise<Ticket> {
    return this.ticketService.getTicketById(ticketId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllTickets(): Promise<Ticket[]> {
    return this.ticketService.getAllTickets();
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UsePipes(new ValidationPipe())
  async updateTicket(
    @Param('id', ParseIntPipe) ticketId: number,
    @Body() updateTicketDto: UpdateTicketDto,
  ): Promise<Ticket> {
    return this.ticketService.updateTicket(ticketId, updateTicketDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteTicket(
    @Param('id', ParseIntPipe) ticketId: number,
  ): Promise<void> {
    return this.ticketService.deleteTicket(ticketId);
  }
}
