import Decimal from "break_eternity.js";

import { PurchasableMap } from "../core/purchasable";
import { tearSpacetimeUpgradesData } from "../data/tear-spacetime-upgrades";
import { mapObject } from "../object-utils";
import { player } from "../player";
import { SpacetimePoints } from "./spacetime";

export const TearSpacetime = {
    requirement: new Decimal(1000),

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

class TearSpacetimeUpgrade extends PurchasableMap {
    readonly stylePreset = "spacetime";

    get currency() {
        return SpacetimePoints;
    }

    get map() {
        return player.tearSpacetimeUpgrades;
    }
}

export const TearSpacetimeUpgrades = mapObject(
    tearSpacetimeUpgradesData,
    (config, id) => new TearSpacetimeUpgrade(config, id)
);
