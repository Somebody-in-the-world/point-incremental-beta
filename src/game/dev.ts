import { Numeric } from "./core/numeric";
import { Time } from "./time";

export const dev = {
    get timeSpeed() {
        return Time.speed.toDecimal();
    },

    set timeSpeed(value) {
        Time.speed = new Numeric(value);
    }
};
