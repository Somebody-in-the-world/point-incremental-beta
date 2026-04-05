import { player } from "./player";
import { Numeric } from "./reusable/numeric";

export const Time = {
    get speed() {
        return new Numeric(3);
    },

    get timePlayed() {
        return player.statistics.timePlayed;
    },

    set timePlayed(value) {
        player.statistics.timePlayed = value;
    }
};
