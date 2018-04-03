import { Player } from './player.model';

export interface Raid {
    id: string;
    gymId: string;
    hatchTime: string;
    raidStartTime: string;
    players: Player[]
}