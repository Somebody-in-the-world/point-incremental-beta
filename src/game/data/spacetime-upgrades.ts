import Decimal from "break_eternity.js";

import { Points } from "../main/points";
import { Effect } from "../reusable/effect";
import { Numeric } from "../reusable/numeric";
import type { PurchasableConfigMap } from "../reusable/purchasable";
import { Time } from "../time";

export const spacetimeUpgradesData = {
    timeMult: {
        description: "Gain more points based on time played",
        cost: new Decimal(1),
        effect: new Effect(
            () => new Numeric(Time.timePlayed).add(1).pow(0.4),
            Effect.MULTIPLY
        )
    },
    baseIncrease: {
        description: "Increase base point upgrade multiplier (2x -> 2.2x)",
        cost: new Decimal(1)
    },
    firstDimBoost: {
        description: "1st dimensions are more effective based on points",
        cost: new Decimal(2),
        effect: new Effect(
            () => Points.add(1).log10().pow(0.75).div(8).add(1),
            Effect.MULTIPLY
        )
    }
} as const satisfies PurchasableConfigMap;
