import { player } from "../player";
import { Numeric } from "../reusable/numeric";
import { SpacetimePoints } from "./spacetime";

export const TearSpacetime = {
    requirement: new Numeric(1000),

    get tore() {
        return player.spacetimeTore;
    },

    set tore(value) {
        player.spacetimeTore = value;
    },

    get canTear() {
        return SpacetimePoints.gte(this.requirement);
    },

    tear() {
        if (this.canTear) this.tore = true;
    }
};
