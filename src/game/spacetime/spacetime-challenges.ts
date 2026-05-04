import { ChallengeMap } from "../challenges";
import type { ChallengeConfig } from "../challenges";
import type { Numeric } from "../core/numeric";
import { spacetimeChallengesData } from "../data/spacetime-challenges";
import { Points } from "../main/points";
import { mapObject } from "../object-utils";
import { player } from "../player";
import { CurrentTheme } from "../themes";
import { SpacetimePrestige } from "./spacetime";

export interface SpacetimeChallengeConfig extends ChallengeConfig {
    unlockRequirement: Numeric;
}

class SpacetimeChallenge extends ChallengeMap<SpacetimeChallengeConfig> {
    readonly namePrefix = "Spacetime challenge";

    reset() {
        if (SpacetimePrestige.canPrestige) {
            SpacetimePrestige.prestige();
        } else {
            SpacetimePrestige.reset();
        }
    }

    get unlockRequirement() {
        return this.config.unlockRequirement;
    }

    get canUnlock() {
        return Points.gte(this.unlockRequirement);
    }

    get unlocked() {
        return player.unlockedSpacetimeChallenges >= this.numericID + 1;
    }

    get stylePreset() {
        return CurrentTheme.elements("spacetime");
    }

    get buttonStylePreset() {
        return CurrentTheme.buttons("spacetime");
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
            player.unlockedSpacetimeChallenges = chall.numericID + 1;
        }
    }
}

export const SpacetimeChallenges = mapObject(
    spacetimeChallengesData,
    (config, id, number_id) => new SpacetimeChallenge(config, id, number_id)
);
