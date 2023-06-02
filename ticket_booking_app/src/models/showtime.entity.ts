import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Theater } from './theater.entity';
import { Movie } from './movie.entity';
import { Booking } from './booking.entity';
import { Screen } from './screen.entity';

@Entity()
export class Showtime {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  price: number;

  @ManyToOne(() => Movie, (movie) => movie.showtimes)
  movie: Movie;

  @ManyToOne(() => Theater, (theater) => theater.showtimes)
  theater: Theater;

  @ManyToOne(() => Screen, (screen) => screen.showtimes)
  screen: Screen;

  @OneToMany(() => Booking, (booking) => booking.showtime)
  bookings: Booking[];
}
