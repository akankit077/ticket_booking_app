import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookingModule } from './booking/booking.module';
import { MovieModule } from './movie/movie.module';
import { ScreenModule } from './screen/screen.module';
import { ShowtimeModule } from './showtime/showtime.module';
import { TheaterModule } from './theater/theater.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    AuthModule,
    UserModule,
    BookingModule,
    MovieModule,
    ScreenModule,
    ShowtimeModule,
    TheaterModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
