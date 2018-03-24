import {
    Body,
    Controller,
    Get,
    HttpStatus,
    Param,
    Post,
    HttpException, Put, Query, Delete
} from '@nestjs/common';
import {RaidRepository} from "./raid.repository";
import {Raid} from "./raid.model";

@Controller('/raids')
export class RaidController {
    constructor(private raidRepository: RaidRepository) {
    }

    @Get()
    async getRaids(@Query('start') start: string, @Query('end') end: string) {
        if ((start && !end) || (!start && end)) {
            throw new HttpException('Bad parameters : no parameters or both start and end must be valued', HttpStatus.BAD_REQUEST);
        }

        return this.raidRepository.getRaids(start, end);
    }

    @Get('/:id')
    async getRaid(@Param('id') id) {
        const raid = await this.raidRepository.getRaid(id);

        if (raid === null) {
            throw new HttpException('Raid not found', HttpStatus.NOT_FOUND);
        }

        return raid;
    }

    @Post('/')
    async createRaid(@Body() raid: Raid) {
        return await this.raidRepository.addRaid(raid);
    }

    @Put('/:id')
    async updateRaid(@Param('id') id, @Body() raid: Raid) {
        await this.getRaid(id);

        return await this.raidRepository.editRaid(id, raid);
    }

    @Delete('/:id')
    async deleteRaid(@Param('id') id) {
        return await this.raidRepository.deleteRaid(id);
    }
}