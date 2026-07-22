import Decimal from "break_eternity.js";

import { player } from "./player";

export const Time = {
    speed: new Decimal(1),

    get timePlayed() {
        return player.statistics.timePlayed;
    },

    set timePlayed(value) {
        player.statistics.timePlayed = value;
    }
};
