import { INFINITY } from "../constants";
import {
    DimensionalPoints,
    DimensionalPrestige
} from "../dimensional/dimensional";
import { Dimensions } from "../dimensional/dimensions";
import { Points } from "../main/points";
import { player } from "../player";
import { Numeric } from "../reusable/numeric";
import { PrestigeCurrency } from "../reusable/prestige-currency";
import { PrestigeLayer } from "../reusable/prestige-layer";
import { Tabs } from "../tabs";

export const SpacetimePoints = new (class extends PrestigeCurrency {
    name = "spacetime point";

    get value() {
        return player.spacetimePoints;
    }

    set value(value) {
        player.spacetimePoints = value;
    }

    get gainAmount() {
        if (Points.lt(INFINITY)) return new Numeric(0);
        return new Numeric(1);
    }
})();

export const SpacetimePrestige = new (class extends PrestigeLayer {
    currency = SpacetimePoints;

    get requiredCurrency() {
        return Points;
    }

    get prestigeCount() {
        return player.statistics.spacetimeCount;
    }

    set prestigeCount(value) {
        player.statistics.spacetimeCount = value;
    }

    reset() {
        DimensionalPrestige.reset();
        DimensionalPoints.amount = new Numeric(0);
        Dimensions.forEach((dim) => {
            dim.boughtAmount = 0;
        });
    }

    postPrestige() {
        if (this.prestigeCount === 1) {
            Tabs.tab("spacetime").enter();
        }
    }
})();
