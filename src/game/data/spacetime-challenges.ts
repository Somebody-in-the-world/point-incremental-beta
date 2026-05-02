import { DimensionalPower } from "../dimensional/dimensional-power";
import { Effect } from "../reusable/effect";
import { Numeric } from "../reusable/numeric";
import type { SpacetimeChallengeConfig } from "../spacetime/spacetime-challenges";

export const spacetimeChallengesData = {
    noDimensions: {
        description: "Dimensions are disabled",
        requirement: new Numeric("1e512"),
        unlockRequirement: new Numeric("1e1000"),
        rewardDescription:
            "Dimension power is more powerful based on dimensional points",
        rewardEffect: new Effect({
            formula: () =>
                DimensionalPower.add(1)
                    .log10()
                    .add(1)
                    .log10()
                    .add(1)
                    .pow(3)
                    .div(40)
                    .add(1),
            type: "mul"
        })
    }
} as const satisfies Record<string, SpacetimeChallengeConfig>;
