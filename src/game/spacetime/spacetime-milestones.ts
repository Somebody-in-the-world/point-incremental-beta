// oxlint-disable unicorn/no-empty-file
/*

import { spacetimeMilestonesData } from "../data/spacetime-milestones";
import { pluralize } from "../format";
import { mapObject } from "../object-utils";
import { Milestone } from "../reusable/milestone";
import { SpacetimePrestige } from "./spacetime";

class SpacetimeMilestone extends Milestone {
    get requirement() {
        return () =>
            SpacetimePrestige.prestigeCount >=
            (this.config.requirement as unknown as number);
    }

    get description() {
        return `Spacetime ${this.requirement} ${pluralize("time", Number(this.requirement()))}`;
    }

    get completed() {
        return this.requirement();
    }

    complete() {}
}

export const SpacetimeMilestones = mapObject(
    spacetimeMilestonesData,
    (config, id) => new SpacetimeMilestone(config, id)
);

*/
