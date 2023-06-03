import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  movieTitle: string;

  @Column()
  movieTime: Date;

  @Column()
  ticketPrice: number;

  @Column()
  numOfSeats: number;

  @Column()
  totalPrice: number;

  @Column()
  creationDate: Date;

  @ManyToOne(() => User, (user) => user.tickets)
  user: User;
}
