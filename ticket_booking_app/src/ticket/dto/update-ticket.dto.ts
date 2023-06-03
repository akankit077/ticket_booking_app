import { IsDate, IsNumber, IsString } from 'class-validator';

export class UpdateTicketDto {
  @IsString()
  movieTitle?: string;

  @IsDate()
  movieTime?: Date;

  @IsNumber()
  ticketPrice?: number;

  @IsNumber()
  numOfSeats?: number;

  @IsNumber()
  totalPrice?: number;
}
