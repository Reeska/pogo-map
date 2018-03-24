import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { GymController } from './gym/gym.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    GymController
  ],
  components: []
})
export class ApplicationModule {}
