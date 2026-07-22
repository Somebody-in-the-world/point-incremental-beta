import type Decimal from "break_eternity.js";

import { ChallengeMap } from "../challenges";
import type { ChallengeConfig } from "../challenges";
import { spacetimeChallengesData } from "../data/spacetime-challenges";
import { Points } from "../main/points";
import { mapObject } from "../object-utils";
import { player } from "../player";
import { Spacetime } from "./spacetime";

export interface SpacetimeChallengeConfig extends ChallengeConfig {
    unlockRequirement: Decimal;
}

class SpacetimeChallenge extends ChallengeMap<SpacetimeChallengeConfig> {
    readonly namePrefix = "Spacetime challenge";
    readonly stylePreset = "spacetime";
    readonly buttonStylePreset = "spacetime";

    reset() {
        if (Spacetime.canPrestige) {
            Spacetime.prestige();
        } else {
            Spacetime.reset();
        }
    }

    get unlockRequirement() {
        return this.config.unlockRequirement;
    }

    get canUnlock() {
        return Points.gte(this.unlockRequirement);
    }

    get unlocked() {
        return player.unlockedSpacetimeChallenges >= this.DecimalID + 1;
    }

    get map() {
        return player.spacetimeChallenges;
    }

    get currency() {
        return Points;
    }
}

export function getRunningSpacetimeChallenge() {
    return Object.values(SpacetimeChallenges).find((chall) => chall.running);
}

export function getFirstLockedSpacetimeChallenge() {
    return Object.values(SpacetimeChallenges).find((chall) => !chall.unlocked);
}

export function unlockSpacetimeChallenge() {
    const chall = getFirstLockedSpacetimeChallenge();
    if (chall) {
        if (chall.canUnlock) {
            player.unlockedSpacetimeChallenges = chall.DecimalID + 1;
        }
    }
}

export function resetUnlockedSpacetimeChallenges() {
    player.unlockedSpacetimeChallenges = 0;
}

export const SpacetimeChallenges = mapObject(
    spacetimeChallengesData,
    (config, id, number_id) => new SpacetimeChallenge(config, id, number_id)
);
