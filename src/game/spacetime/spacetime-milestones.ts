import { MilestoneConfigless } from "@/game/core/milestone";

import { spacetimeMilestonesData } from "../data/spacetime-milestones";
import { pluralize } from "../format";
import { mapObject } from "../object-utils";
import { Spacetime } from "./spacetime";

export interface SpacetimeMilestoneConfig {
    requirement: number;
    rewardDescription: string;
}

class SpacetimeMilestone extends MilestoneConfigless {
    constructor(
        public config: SpacetimeMilestoneConfig,
        public id: string
    ) {
        super();
    }

    get requirement() {
        return () => Spacetime.prestigeCount >= this.config.requirement;
    }

    get description() {
        return `Spacetime ${this.config.requirement} ${pluralize("time", Number(this.config.requirement))}`;
    }

    get completed() {
        return this.requirement();
    }

    get rewardDescription() {
        return this.config.rewardDescription;
    }

    complete() {}
}

export const SpacetimeMilestones = mapObject(
    spacetimeMilestonesData,
    (config, id) => new SpacetimeMilestone(config, id)
);
