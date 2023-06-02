import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';
import { Showtime } from './showtime.entity';

@Entity()
export class Booking {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  numSeats: number;

  @Column()
  totalPrice: number;

  @Column()
  bookingTime: Date;

  @ManyToOne(() => User, (user) => user.bookings)
  user: User;

  @ManyToOne(() => Showtime, (showtime) => showtime.bookings)
  showtime: Showtime;
}
