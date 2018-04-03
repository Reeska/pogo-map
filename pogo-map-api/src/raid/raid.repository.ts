import {Component} from "@nestjs/common";
import database from "../database";
import * as uidGenerator from "uuid/v1";
import {Raid} from "./raid.model";
import * as Bluebird from "bluebird";

@Component()
export class RaidRepository {
    fields: string = 'id, gym_id as "gymId", hatch_time as "hatchTime", raid_start_time as "raidStartTime", players';

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

    async getOverlappingRaids(gymId, start): Promise<Raid[]> {
        const startAsDate = new Date(start);
        const startDate = new Date(startAsDate.getTime() - (105*60*1000));
        const endDate = new Date(startAsDate.getTime() + (105*60*1000));
        const query = `select ${this.fields} from raid where gym_id = :gymId and hatch_time between :startDate and :endDate`;
        const replacements = {gymId, startDate, endDate};

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
            `insert into raid(id, gym_id, hatch_time, raid_start_time, players)
                values(:id, :gymId, (:hatchTime)::timestamptz, 
                ${raid.raidStartTime ? `(:raidStartTime)::timestamptz` : `null`},
                (:players)::json)`, {
                replacements: {...raid, players: JSON.stringify(raid.players || null)}
            });

        return raid;
    }


    async editRaid(id: string, raid: Raid): Promise<Raid> {
        await database.query(
            `update raid set 
            hatch_time = :hatchTime, 
            raid_start_time = ${raid.raidStartTime ? `:raidStartTime` : `null`}
            where id = :id`, {
            replacements: {...raid, id}
        });

        return this.getRaid(id);
    }

    async editRaidPlayers(id: string, raid: Raid): Promise<Raid> {
        await database.query(
            `update raid set 
            players = (:players)::json
            where id = :id`, {
                replacements: {players: JSON.stringify(raid.players || null), id}
            });

        return this.getRaid(id);
    }

    deleteRaid(id: string): Bluebird<any> {
        return database.query('delete from raid where id = :id', {
            replacements: {id}
        });
    }
}
