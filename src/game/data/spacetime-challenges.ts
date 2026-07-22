import Decimal from "break_eternity.js";

import { Effect } from "../core/effect";
import { DarkMatter } from "../dark-matter/dark-matter";
import { DimensionalPoints } from "../dimensional/dimensional";
import { DimensionalPower } from "../dimensional/dimensional-power";
import type { SpacetimeChallengeConfig } from "../spacetime/spacetime-challenges";

export const spacetimeChallengesData = {
    noDimensions: {
        description: "Dimensions are disabled",
        requirement: new Decimal("1e555"),
        unlockRequirement: new Decimal("1e1000"),
        rewardDescription:
            "Dimension power is more powerful based on dimensional points",
        rewardEffect: new Effect({
            // i have absolutely no idea why i need to cast this, i HATE typescript
            formula: (() =>
                DimensionalPoints.add(1)
                    .log10()
                    .add(1)
                    .log10()
                    .add(1)
                    .pow(3)
                    .div(30)
                    .add(1)) as () => Decimal,
            type: "mul"
        })
    },
    dimNoPerPurchase: {
        description: "Dimension per-purchase multiplier is always 1x",
        requirement: new Decimal("1e1120"),
        unlockRequirement: new Decimal("1e1600"),
        rewardDescription:
            "Increase dimension per-purchase multiplier (2x -> 2.5x)",
        rewardEffect: new Effect({
            formula: () => new Decimal(0.5),
            type: "add",
            formatter: null
        })
    },
    pointGainSqrt: {
        description: "Point gain is square rooted",
        requirement: new Decimal("1e400"),
        unlockRequirement: new Decimal("1e2345"),
        rewardDescription: "Point gain ^1.05",
        rewardEffect: new Effect({
            formula: () => new Decimal(1.05),
            type: "pow",
            formatter: null
        })
    },
    expensivePointUpgrades: {
        description: "Point upgrade cost is hyper-exponentially increased",
        requirement: new Decimal("1e1111"),
        unlockRequirement: new Decimal("1e4200"),
        rewardDescription: "Point upgrade cost multiplier increase 2x -> 1.75x",
        rewardEffect: new Effect({
            formula: () => new Decimal(0.25),
            type: "sub",
            formatter: null
        })
    },
    noCPAndAP: {
        description:
            "Compressed points effect is always 1x and automation points effect is always 100%",
        requirement: new Decimal("1e1600"),
        unlockRequirement: new Decimal("1e6750"),
        rewardDescription:
            "Increase compressed points and automation points effect exponent"
    },
    dimPowMult: {
        description:
            "Dimensional power divides point upgrade's cost instead of increasing its effectiveness",
        requirement: new Decimal("1e6000"),
        unlockRequirement: new Decimal("1e12345"),
        rewardDescription:
            "Dimensional power boosts points with reduced effect",
        rewardEffect: new Effect({
            formula: () => DimensionalPower.add(1).pow(0.1).mul("1e150"),
            type: "mul"
        })
    },
    dimPowExp: {
        description: "Dimensional power formula is worse",
        requirement: new Decimal("1e25000"),
        unlockRequirement: new Decimal("1e28888"),
        rewardDescription:
            "Gain more dimensional points based on dimensional power",
        rewardEffect: new Effect({
            formula: () =>
                Decimal.min(DimensionalPower.add(1).pow(0.1), "1e1700"),
            type: "mul"
        })
    },
    pointDiv: {
        description: "Point gain is divided by 1e10000",
        requirement: new Decimal("1e10000"),
        unlockRequirement: new Decimal("1e40000"),
        rewardDescription: "Dark generator multiplier based on dark matter",
        rewardEffect: new Effect({
            formula: () => DarkMatter.add(1).log10().div(3).add(1),
            type: "mul"
        })
    }
} as const satisfies Record<string, SpacetimeChallengeConfig>;
