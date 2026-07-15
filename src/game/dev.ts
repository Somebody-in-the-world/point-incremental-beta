import { Time } from "./time";

export const dev = {
    get timeSpeed() {
        return Time.speed;
    },

    set timeSpeed(value) {
        Time.speed = value;
    }
};
