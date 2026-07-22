import Decimal from "break_eternity.js";

import { Effect } from "../core/effect";
import type { PurchasableConfig } from "../core/purchasable";
import { DarkMatter } from "../dark-matter/dark-matter";
import { DimensionalPower } from "../dimensional/dimensional-power";
import { Dimensions } from "../dimensional/dimensions";
import { format } from "../format";
import { Points } from "../main/points";
import { SpacetimePoints } from "../spacetime/spacetime";

export const tearSpacetimeUpgradesData = {
    totalPointBoost: {
        description: "Gain a boost to points based on total points",
        cost: new Decimal(1e3),
        effect: new Effect({
            formula: () => Points.total.add(1).log10().add(1).pow(5),
            type: "mul"
        })
    },
    spacetimePointBoost: {
        description: "Gain a boost to points based on unspent spacetime points",
        cost: new Decimal(2.5e3),
        effect: new Effect({
            formula: () =>
                Decimal.min(
                    SpacetimePoints.pow(1.25).add(1).mul(1e10),
                    "1e100"
                ),
            type: "mul"
        })
    },
    dimPowerBoost: {
        description:
            "Dimensional power is more powerful based on unspent spacetime points",
        cost: new Decimal(1e4),
        effect: new Effect({
            formula: () =>
                SpacetimePoints.add(1).log10().add(1).pow(0.85).sub(1).div(2),
            type: "add",
            formatter: (effect) => `+${format(effect.mul(100), { digits: 2 })}%`
        })
    },
    freePointUpgrades: {
        description: "Gain free point upgrades based on 8th dimensions",
        cost: new Decimal(4.4444e4),
        effect: new Effect({
            formula: () =>
                new Decimal(
                    Math.min(Dimensions[7].boughtAmount * 1.5 + 30, 200)
                ),
            type: "add"
        })
    },
    allDimBoost: {
        description: "Power up all dimensions based on dimensional power",
        cost: new Decimal(2.5e5),
        effect: new Effect({
            formula: () =>
                DimensionalPower.add(1).log10().add(1).pow(2.5).mul(10000),
            type: "mul"
        })
    },
    dimAutoBulk: {
        description: "Dimension autobuyers bulk buy upgrades",
        cost: new Decimal(4e6)
    },
    dimPowerFormula: {
        description:
            "Improve dimensional power effect formula (log(x) -> log(x)^2)",
        cost: new Decimal(2.5e7)
    },
    autoDP: {
        description:
            "Automatically gain 1% of DP you would normally gain on dimensional per second",
        cost: new Decimal(1.5e11)
    },
    betterDimPowFormula: {
        description:
            "Further improve dimensional power effect formula (log(x)^2 -> log(x)^2.5)",
        cost: new Decimal(1e25)
    },
    darkMatterSPBoost: {
        description: "Dark matter and spacetime points boost each other",
        cost: new Decimal(1e40),
        effect: new Effect({
            formula: () =>
                DarkMatter.pow(0.2)
                    .add(1)
                    .mul(SpacetimePoints.add(1).log10().add(1))
                    .pow(0.5)
                    .add(1),
            type: "mul"
        })
    },
    pointUpgradeCostMultiReduction: {
        repeatable: true,
        cap: 8,
        description: "Reduce point upgrade cost multiplier increase",
        cost: (boughtAmount) => new Decimal(5).pow(boughtAmount).mul("1e5"),
        effect: new Effect({
            formula: (boughtAmount) => new Decimal(boughtAmount),
            type: "sub"
        })
    },
    offlineProgress: {
        repeatable: true,
        description: "Gain a percentage of highest SP per minute while offline",
        cap: 10,
        cost: (boughtAmount) => new Decimal(5).pow(boughtAmount).mul(1e6),
        effect: new Effect({
            formula: (boughtAmount) =>
                SpacetimePoints.highestPerMinute
                    .div(60)
                    .mul(boughtAmount * 0.05),
            type: "add",
            formatter: (_effect, boughtAmount) =>
                `${(boughtAmount * 5).toFixed(2)}%`
        })
    }
} as const satisfies Record<string, PurchasableConfig>;
