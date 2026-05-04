import type { ArrayIndices } from "type-fest";

import { Achievements } from "../achievements";
import { type AutobuyerConfig } from "../autobuyers";
import { Numeric } from "../core/numeric";
import {
    DimensionalPoints,
    DimensionalPrestige
} from "../dimensional/dimensional";
import { Dimensions } from "../dimensional/dimensions";
import { PointUpgrade } from "../main/point-upgrade";
import { SpacetimePoints, SpacetimePrestige } from "../spacetime/spacetime";
import { getRunningSpacetimeChallenge } from "../spacetime/spacetime-challenges";
import { SpacetimeMilestones } from "../spacetime/spacetime-milestones";
import {
    TearSpacetime,
    TearSpacetimeUpgrades
} from "../spacetime/tear-spacetime";

export const autobuyersData = {
    spacetime: {
        name: "Automatic spacetime",
        action() {
            if (
                TearSpacetime.tore &&
                getRunningSpacetimeChallenge() === undefined
            ) {
                if (
                    SpacetimePoints.gainAmount.gte(
                        this.inputs.threshold as Numeric
                    )
                ) {
                    SpacetimePrestige.prestige();
                }
            } else {
                SpacetimePrestige.prestige();
            }
        },
        requirement: () => SpacetimeMilestones.autoSpacetime.completed,
        inputs: {
            threshold: {
                description: "Spacetime at X SP: ",
                type: Numeric,
                defaultValue: "0",
                unlockRequirement: () => TearSpacetime.tore
            }
        },
        type: "prestige"
    },
    dimensional: {
        name: "Automatic dimensional",
        action() {
            if (
                DimensionalPoints.gainAmount.gt(
                    this.inputs.threshold.mul(DimensionalPoints.amount)
                )
            ) {
                DimensionalPrestige.prestige();
            }
        },
        requirement: () => SpacetimeMilestones.autoDimensional.completed,
        inputs: {
            threshold: {
                description: "X times current DP:",
                type: Numeric,
                defaultValue: "1e10"
            }
        },
        type: "prestige"
    },
    pointUpgrade: {
        name: "Point upgrade autobuyer",
        action() {
            if (Achievements.getByID("a34").completed) {
                PointUpgrade.bulkPurchase();
            } else {
                PointUpgrade.purchase();
            }
        },
        requirement: () => SpacetimeMilestones.pointUpgradeAutobuyer.completed,
        type: "purchase"
    },
    dim1: {
        name: "1st Dimension autobuyer",
        action: () => purchaseDim(0),
        requirement: () => SpacetimeMilestones.dim1To4Auto.completed,
        type: "purchase"
    },
    dim2: {
        name: "2nd Dimension autobuyer",
        action: () => purchaseDim(1),
        requirement: () => SpacetimeMilestones.dim1To4Auto.completed,
        type: "purchase"
    },
    dim3: {
        name: "3rd Dimension autobuyer",
        action: () => purchaseDim(2),
        requirement: () => SpacetimeMilestones.dim1To4Auto.completed,
        type: "purchase"
    },
    dim4: {
        name: "4th Dimension autobuyer",
        action: () => purchaseDim(3),
        requirement: () => SpacetimeMilestones.dim1To4Auto.completed,
        type: "purchase"
    },
    dim5: {
        name: "5th Dimension autobuyer",
        action: () => purchaseDim(4),
        requirement: () => SpacetimeMilestones.dim5To8Auto.completed,
        type: "purchase"
    },
    dim6: {
        name: "6th Dimension autobuyer",
        action: () => purchaseDim(5),
        requirement: () => SpacetimeMilestones.dim5To8Auto.completed,
        type: "purchase"
    },
    dim7: {
        name: "7th Dimension autobuyer",
        action: () => purchaseDim(6),
        requirement: () => SpacetimeMilestones.dim5To8Auto.completed,
        type: "purchase"
    },
    dim8: {
        name: "8th Dimension autobuyer",
        action: () => purchaseDim(7),
        requirement: () => SpacetimeMilestones.dim5To8Auto.completed,
        type: "purchase"
    }
} as const satisfies Record<string, AutobuyerConfig>;

function purchaseDim(dim: ArrayIndices<typeof Dimensions>): void {
    if (TearSpacetimeUpgrades.dimAutoBulk.bought) {
        Dimensions[dim].bulkPurchase();
    } else {
        Dimensions[dim].purchase();
    }
}
