import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Showtime } from './showtime.entity';

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  releaseDate: Date;

  @Column()
  duration: number;

  @Column()
  genre: string;

  @Column()
  description: string;

  @OneToMany(() => Showtime, (showtime) => showtime.movie)
  showtimes: Showtime[];
}
