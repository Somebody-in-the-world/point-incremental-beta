import { Effect } from "../core/effect";
import { Numeric } from "../core/numeric";
import { DimensionalPoints } from "../dimensional/dimensional";
import type { SpacetimeChallengeConfig } from "../spacetime/spacetime-challenges";

export const spacetimeChallengesData = {
    noDimensions: {
        description: "Dimensions are disabled",
        requirement: new Numeric("1e512"),
        unlockRequirement: new Numeric("1e1000"),
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
                    .add(1)) as () => Numeric,
            type: "mul"
        })
    },
    dimNoPerPurchase: {
        description: "Dimension per-purchase multiplier is always 1x",
        requirement: new Numeric("1e1075"),
        unlockRequirement: new Numeric("1e1600"),
        rewardDescription:
            "Increase dimension per-purchase multiplier (2x -> 2.5x)",
        rewardEffect: new Effect({
            formula: () => new Numeric(0.5),
            type: "add",
            formatter: null
        })
    },
    pointGainSqrt: {
        description: "Point gain is square rooted",
        requirement: new Numeric("1e365"),
        unlockRequirement: new Numeric("1e2345"),
        rewardDescription: "Point gain ^1.05",
        rewardEffect: new Effect({
            formula: () => new Numeric(1.05),
            type: "pow",
            formatter: null
        })
    },
    noPointUpgrades: {
        description: "Point upgrades are disabled",
        requirement: new Numeric("1e555"),
        unlockRequirement: new Numeric("1e4000"),
        rewardDescription: "Point upgrade cost multiplier increase 2x -> 1.5x",
        rewardEffect: new Effect({
            formula: () => new Numeric(0.5),
            type: "sub",
            formatter: null
        })
    }
} as const satisfies Record<string, SpacetimeChallengeConfig>;
