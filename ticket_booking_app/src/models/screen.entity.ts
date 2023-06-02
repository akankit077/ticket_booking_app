import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Theater } from './theater.entity';
import { Showtime } from './showtime.entity';

@Entity()
export class Screen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  capacity: number;

  @ManyToOne(() => Theater, (theater) => theater.screens)
  theater: Theater;

  @OneToMany(() => Showtime, (showtime) => showtime.screen)
  showtimes: Showtime[];
}
