import Decimal from "break_eternity.js";

import { Effect } from "@/game/core/effect";

import type { PurchasableConfig } from "../core/purchasable";
import { DimensionalPower } from "../dimensional/dimensional-power";
import { format } from "../format";
import { Points } from "../main/points";
import { SpacetimePoints, Spacetime } from "../spacetime/spacetime";
import { Time } from "../time";

export const spacetimeUpgradesData = {
    timeMult: {
        description: "Gain more points based on time played",
        cost: new Decimal(1),
        effect: new Effect({
            formula: () => new Decimal(Time.timePlayed).add(1).pow(0.4),
            type: "mul"
        })
    },
    baseIncrease: {
        description: "Increase base point upgrade multiplier (2x -> 2.2x)",
        cost: new Decimal(1)
    },
    firstDimBoost: {
        description: "1st dimensions are more effective based on points",
        cost: new Decimal(1),
        effect: new Effect({
            formula: () => Points.add(1).log10().pow(0.65).div(4).add(1),
            type: "mul"
        })
    },
    pointUpgradeCostDelay: {
        description:
            "Delay faster cost increase of point upgrades based on times spacetimed",
        cost: new Decimal(1),
        effect: new Effect({
            formula: () =>
                Decimal.min(
                    new Decimal(Spacetime.prestigeCount)
                        .mul(0.75)
                        .add(15)
                        .floor(),
                    100
                ),
            formatter: (effect) =>
                `${format(effect, { digitsBelowThousand: 0 })} upgrades later`,
            type: "add"
        })
    },
    DPBoost: {
        description:
            "Increase dimensional point gain based on dimensional power",
        cost: new Decimal(2),
        effect: new Effect({
            formula: () =>
                DimensionalPower.amount
                    .add(1)
                    .log10()
                    .pow(0.75)
                    .mul(0.25)
                    .add(1),
            type: "mul"
        })
    },
    pointSelfBoost: {
        description: "Points boost itself",
        cost: new Decimal(5),
        effect: new Effect({
            formula: () => Points.add(1).log10().pow(2.5).add(1),
            type: "mul"
        })
    },
    allDimBoost: {
        description: "All dimensions gain a boost based on fastest spacetime",
        cost: new Decimal(20),
        effect: new Effect({
            formula: () =>
                new Decimal(
                    Math.min(10 / Spacetime.fastestSpacetime + 1, 1000)
                ),
            type: "mul"
        })
    },
    dimPowBoost: {
        description:
            "Gain a multiplier to dimensional power production based on unspent spacetime points",
        cost: new Decimal(250),
        effect: new Effect({
            formula: () =>
                Decimal.min(
                    SpacetimePoints.pow(2).div(10).add(1),
                    new Decimal(1e10)
                ),
            type: "mul"
        })
    }
} as const satisfies Record<string, PurchasableConfig>;
