import Decimal from "break_eternity.js";
import type { ArrayLength, TupleOf } from "type-fest";

import { withEffects } from "../core/effect";
import { PurchasableConfigless } from "../core/purchasable";
import { darkGeneratorsData } from "../data/dark-generators";
import { Points } from "../main/points";
import { player } from "../player";
import { SpacetimePoints } from "../spacetime/spacetime";
import { SpacetimeChallenges } from "../spacetime/spacetime-challenges";
import { TearSpacetimeUpgrades } from "../spacetime/tear-spacetime";

export interface DarkGeneratorConfig {
    baseCost: Decimal;
    costMultiplier: Decimal;
    requirement: Decimal;
    multiplier: Decimal;
}

export class DarkGenerator extends PurchasableConfigless {
    constructor(
        public config: DarkGeneratorConfig,
        public id: number
    ) {
        super();
    }

    get repeatable() {
        return true;
    }

    readonly stylePreset = "darkMatter";

    get currency() {
        return SpacetimePoints;
    }

    get description() {
        return `Tier ${this.id + 1} dark generator`;
    }

    get multiplierPerTier() {
        return this.config.multiplier;
    }

    calculateCost(boughtAmount: number) {
        return this.config.baseCost.mul(
            this.config.costMultiplier.pow(boughtAmount)
        );
    }

    get unlocked() {
        if (this.id >= player.darkGenerators.length || this.id < 0) {
            throw new ReferenceError(`Invalid dark generator ID: ${this.id}`);
        }
        return player.darkGenerators[this.id]!.unlocked;
    }

    set unlocked(val) {
        player.darkGenerators[this.id]!.unlocked = val;
    }

    get canUnlock() {
        return Points.gte(this.requirement);
    }

    unlock() {
        if (this.canUnlock) this.unlocked = true;
    }

    get production(): Decimal {
        if (this.id === 0 && this.boughtAmount === 0) return new Decimal(0);
        return withEffects(
            new Decimal(this.multiplierPerTier)
                .pow(this.boughtAmount)
                .mul(DarkGenerators[this.id + 1]?.production ?? 1)
        )
            .apply(
                this.id === 0
                    ? TearSpacetimeUpgrades.darkMatterSPBoost.effect
                    : null
            )
            .apply(SpacetimeChallenges.pointDiv.rewardEffect).value;
    }

    get requirement() {
        return this.config.requirement;
    }

    get boughtAmount() {
        if (this.id >= player.darkGenerators.length || this.id < 0) {
            throw new ReferenceError(`Invalid dark generator ID: ${this.id}`);
        }
        return player.darkGenerators[this.id]!.bought;
    }

    set boughtAmount(value) {
        player.darkGenerators[this.id]!.bought = value;
    }
}

export const DarkGenerators = darkGeneratorsData.map(
    (config, id) => new DarkGenerator(config, id)
) as TupleOf<ArrayLength<typeof darkGeneratorsData>, DarkGenerator>;
