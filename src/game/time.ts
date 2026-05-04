import { Numeric } from "./core/numeric";
import { player } from "./player";

export const Time = {
    get speed() {
        return new Numeric(1);
    },

    get timePlayed() {
        return player.statistics.timePlayed;
    },

    set timePlayed(value) {
        player.statistics.timePlayed = value;
    }
};
