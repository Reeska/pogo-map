import {Component} from "@nestjs/common";
import database from "../database";
import * as uidGenerator from "uuid/v1";
import {Raid} from "./raid.model";

@Component()
export class RaidRepository {
    fields: string = 'id, gym_id as "gymId", hatch_time as "hatchTime", raid_start_time as "raidStartTime"';

    async getRaids(start, end): Promise<Raid[]> {
        let query = '';
        let replacements = {};

        if (start && end) {
            query = `select ${this.fields} from raid where hatch_time between :start and :end`
            replacements = {start, end}
        } else {
            query = `select ${this.fields} from raid`;
        }

        return await database.query(query, {replacements, type: database.QueryTypes.SELECT});
    }

    async getRaid(id: string): Promise<Raid> {
        const gyms = await database.query(`select ${this.fields} from raid where id = :id`, {
            replacements: {id},
            type: database.QueryTypes.SELECT
        });

        if (gyms.length === 0) {
            return null;
        }

        return gyms[0];
    }

    async addRaid(raid: Raid): Promise<Raid> {
        raid.id = uidGenerator();

        await database.query(
            `insert into raid(id, gym_id, hatch_time, raid_start_time) 
            values(:id, :gymId, (:hatchTime)::timestamptz, (:raidStartTime)::timestamptz)`, {
                replacements: raid
            });

        return raid;
    }


    async editRaid(id: string, raid: Raid): Promise<Raid> {
        await database.query(
            `update raid set hatch_time = :hatchTime, raid_start_time = :raidStartTime 
            where id = :id`, {
            replacements: {...raid, id}
        });

        return this.getRaid(id);
    }

    async deleteRaid(id: string) {
        await database.query('delete from raid where id = :id', {
            replacements: {id}
        });
    }
}