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
    dimMultDiv: {
        description:
            "Buying dimensions 1-7 also divides the next dimension's multiplier",
        requirement: new Numeric("1e1300"),
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
    }
} as const satisfies Record<string, SpacetimeChallengeConfig>;
