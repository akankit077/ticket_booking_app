import { Transform } from 'class-transformer';
import { IsDate, IsNumber, IsString } from 'class-validator';

export class CreateTicketDto {
  @IsString()
  movieTitle: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  movieTime: Date;

  @IsNumber()
  ticketPrice: number;

  @IsNumber()
  numOfSeats: number;

  @IsNumber()
  totalPrice: number;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  creationDate: Date;

  @IsNumber()
  userId: number;
}
