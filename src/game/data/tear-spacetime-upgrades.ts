import { DimensionalPower } from "../dimensional/dimensional-power";
import { Dimensions } from "../dimensional/dimensions";
import { format } from "../format";
import { Points } from "../main/points";
import { Effect } from "../reusable/effect";
import { Numeric } from "../reusable/numeric";
import type { PurchasableConfigMap } from "../reusable/purchasable";
import { SpacetimePoints } from "../spacetime/spacetime";

export const tearSpacetimeUpgradesData = {
    totalPointBoost: {
        description: "Gain a boost to points based on total points",
        cost: new Numeric(1e3),
        effect: new Effect({
            formula: () => Points.total.add(1).log10().add(1).pow(5),
            type: "mul"
        })
    },
    currentPointBoost: {
        description: "Gain a boost to points based on current points",
        cost: new Numeric(2.5e3),
        effect: new Effect({
            formula: () => Points.add(1).log10().add(1).pow(6).div(10),
            type: "mul"
        })
    },
    dimPowerBoost: {
        description:
            "Dimensional power is more powerful based on unspent spacetime points",
        cost: new Numeric(1e4),
        effect: new Effect({
            formula: () =>
                SpacetimePoints.add(1).log10().add(1).pow(0.8).sub(1).div(3),
            type: "add",
            formatter: (effect) => `+${format(effect.mul(100), { digits: 2 })}%`
        })
    },
    freePointUpgrades: {
        description: "Gain free point upgrades based on 8th dimensions",
        cost: new Numeric(4.4444e4),
        effect: new Effect({
            formula: () =>
                new Numeric(
                    Math.min(Dimensions[7].boughtAmount * 1.5 + 20, 400)
                ),
            type: "add"
        })
    },
    allDimBoost: {
        description: "Power up all dimensions based on dimensional power",
        cost: new Numeric(2.5e5),
        effect: new Effect({
            formula: () =>
                DimensionalPower.add(1).log10().add(1).pow(2.5).mul(10000),
            type: "mul"
        })
    },
    pointUpgradeCostMultiReduction: {
        repeatable: true,
        cap: 8,
        description: "Reduce point upgrade cost multiplier increase",
        cost: (boughtAmount) =>
            new Numeric(1e5).mul(new Numeric(5).pow(boughtAmount)),
        effect: new Effect({
            formula: (boughtAmount) => new Numeric(boughtAmount),
            type: "sub"
        })
    }
} as const satisfies PurchasableConfigMap;
