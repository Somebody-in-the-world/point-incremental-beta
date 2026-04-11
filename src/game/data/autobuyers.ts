import { type AutobuyerConfig } from "../autobuyers";
import { PointUpgrade } from "../main/point-upgrade";
import { SpacetimeMilestones } from "../spacetime/spacetime-milestones";

export const autobuyersData = {
    pointUpgrade: {
        name: "Point upgrade autobuyer",
        action: () => PointUpgrade.purchase(),
        requirement: () => SpacetimeMilestones.pointUpgradeAutobuyer.completed,
        type: "purchase"
    }
} as const satisfies Record<string, AutobuyerConfig>;
