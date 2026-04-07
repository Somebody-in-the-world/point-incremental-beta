import { Themes } from "../themes";
import type { Effect } from "./effect";

export interface MilestoneConfig {
    name: string;
    description: string | (() => string);
    requirement: () => boolean;
    rewardDescription?: string | (() => string);
    rewardEffect?: Effect;
}

export abstract class Milestone {
    constructor(
        public config: MilestoneConfig,
        public readonly id: string | number
    ) {}

    get stylePreset() {
        return Themes.current.milestones("unstyled");
    }

    get name() {
        return this.config.name;
    }

    get description() {
        if (typeof this.config.description === "function") {
            return this.config.description();
        }
        return this.config.description;
    }

    get rewardDescription() {
        const description = this.config.rewardDescription;
        if (!description) return null;
        if (typeof description === "function") {
            return description();
        }
        return description;
    }

    get rewardEffectObject() {
        return this.config.rewardEffect ?? null;
    }

    get rewardEffect() {
        if (!this.rewardEffectObject) return null;
        return this.rewardEffectObject.formula();
    }

    get requirement() {
        return this.config.requirement;
    }

    abstract get completed(): boolean;
    abstract complete(): void;
}

export abstract class MilestoneMap extends Milestone {
    constructor(
        public config: MilestoneConfig,
        public readonly id: string
    ) {
        super(config, id);
    }

    abstract get map(): Map<string, boolean>;

    get completed() {
        return this.map.get(this.id) ?? false;
    }

    complete() {
        this.map.set(this.id, true);
    }
}
