import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    HttpException
} from '@nestjs/common';
import {GymRepository} from "./gym.repository";
import {Gym} from "./gym.model";

@Controller('/gyms')
export class GymController {
    constructor(private gymRepository: GymRepository) {
    }

    @Get()
    async getGyms() {
        return this.gymRepository.getGyms();
    }

    @Get('/:id')
    async getGym(@Param('id') id) {
        const gym = await this.gymRepository.getGym(id);

        if (gym === null) {
            throw new HttpException('Gym not found', HttpStatus.NOT_FOUND);
        }

        return gym;
    }

    @Post('/')
    async createGym(@Body() gym: Gym) {
        return await this.gymRepository.addGym(gym);
    }
}
