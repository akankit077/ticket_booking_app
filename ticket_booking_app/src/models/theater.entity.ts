import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Showtime } from './showtime.entity';
import { Screen } from './screen.entity';

@Entity()
export class Theater {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  address: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  zip: string;

  @OneToMany(() => Screen, (screen) => screen.theater)
  screens: Screen[];

  @OneToMany(() => Showtime, (showtime) => showtime.theater)
  showtimes: Showtime[];
}
