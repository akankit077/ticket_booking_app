import { configService } from 'src/config/config.service';

export const jwtConstants = {
  secret: configService.getJwtSecret(),
};
