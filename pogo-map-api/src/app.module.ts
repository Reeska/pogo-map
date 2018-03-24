import {Module} from '@nestjs/common';
import {AppController} from './app.controller';
import {GymController} from './gym/gym.controller';
import {GymRepository} from "./gym/gym.repository";
import {RaidController} from "./raid/raid.controller";
import {RaidRepository} from "./raid/raid.repository";

@Module({
    imports: [],
    controllers: [
        AppController,
        GymController,
        RaidController
    ],
    components: [
        GymRepository,
        RaidRepository
    ]
})
export class ApplicationModule {
}
