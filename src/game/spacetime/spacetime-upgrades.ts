import { spacetimeUpgradesData } from "../data/spacetime-upgrades";
import { mapObject } from "../object-utils";
import { player } from "../player";
import { PurchasableMap } from "../reusable/purchasable";
import { Themes } from "../themes";
import { SpacetimePoints } from "./spacetime";

class SpacetimeUpgrade extends PurchasableMap {
    get repeatable() {
        return false;
    }

    get currency() {
        return SpacetimePoints;
    }

    get stylePreset() {
        return Themes.current.purchasable("spacetime");
    }

    get map() {
        return player.spacetimeUpgrades;
    }
}

export const SpacetimeUpgrades = mapObject(
    spacetimeUpgradesData,
    (config, id) => new SpacetimeUpgrade(config, id)
);
