import {Component} from "@nestjs/common";
import database from "../database";
import * as uidGenerator from "uuid/v1";
import {Gym} from './gym.model'

@Component()
export class GymRepository {
    async getGyms(): Promise<Gym[]> {
        return await database.query('select * from gym', {type: database.QueryTypes.SELECT});
    }

    async getGym(id: string): Promise<Account> {
        const gyms = await database.query('select * from gym where id = :id', {
            replacements: {id},
            type: database.QueryTypes.SELECT
        });

        if (gyms.length === 0) {
            return null;
        }

        return gyms[0];
    }

    async addGym(gym: Gym): Promise<Gym> {
        gym.id = uidGenerator();

        await database.query(
            `insert into gym(id, name, latitude, longitude) 
            values(:id, :name, :latitude, :longitude)`, {
                replacements: gym
            });

        return gym;
    }

    //
    // async editAccount(uid: string, account: Account): Promise<Account> {
    //     await database.query('update account set name = :name, balance = :balance where uid = :uid', {
    //         replacements: {...account, uid}
    //     });
    //
    //     return this.getAccount(uid);
    // }
}