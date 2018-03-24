import {Controller, Get, Param} from '@nestjs/common';

@Controller('/gyms')
export class GymController {
    constructor() {
    }

    @Get()
    gyms() {
        return [];
    }

    @Get('/:id')
    gym(@Param('id') id) {
        return { id };
    }
}
