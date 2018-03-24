import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {GymController} from './gym/gym.controller';
import {GymRepository} from "./gym/gym.repository";

@Module({
    imports: [],
    controllers: [
        AppController,
        GymController
    ],
    components: [
        GymRepository
    ]
})
export class ApplicationModule {
}
