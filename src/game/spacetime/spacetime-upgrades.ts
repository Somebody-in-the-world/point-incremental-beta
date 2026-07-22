import Decimal from "break_eternity.js";

import { PurchasableConfigless, PurchasableMap } from "@/game/core/purchasable";

import { Autobuyers } from "../autobuyers";
import { Effect } from "../core/effect";
import { spacetimeUpgradesData } from "../data/spacetime-upgrades";
import { format } from "../format";
import { mapObject } from "../object-utils";
import { player } from "../player";
import { SpacetimePoints } from "./spacetime";

class SpacetimeUpgrade extends PurchasableMap {
    get repeatable() {
        return false;
    }

    get currency() {
        return SpacetimePoints;
    }

    readonly stylePreset = "spacetime";

    get map() {
        return player.spacetimeUpgrades;
    }
}

export const SpacetimeUpgrades = mapObject(
    spacetimeUpgradesData,
    (config, id) => new SpacetimeUpgrade(config, id)
);

export const SpacetimePointMultUpgrade =
    new (class extends PurchasableConfigless {
        calculateCost(boughtAmount: number) {
            return new Decimal(10).mul(new Decimal(25).pow(boughtAmount));
        }

        get effectObject() {
            return new Effect({
                formula: (boughtAmount) => new Decimal(3).pow(boughtAmount),
                type: "mul"
            });
        }

        get repeatable() {
            return true;
        }

        get boughtAmount() {
            return player.spacetimePointMultUpgrade;
        }

        set boughtAmount(value) {
            player.spacetimePointMultUpgrade = value;
        }

        get currency(): typeof SpacetimePoints {
            return SpacetimePoints;
        }

        get description() {
            return "Triple spacetime point gain";
        }

        readonly stylePreset = "spacetime";

        purchaseFunc() {
            Autobuyers.spacetime.playerConfig.inputs.threshold = format(
                Autobuyers.spacetime.inputs.threshold.mul(3)
            );
        }
    })();
