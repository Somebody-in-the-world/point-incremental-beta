import Decimal from "break_eternity.js";

import { ATOMIC_REQ } from "../constants";
import { PrestigeCurrency } from "../core/prestige-currency";
import { PrestigeLayer } from "../core/prestige-layer";
import { DarkGenerators } from "../dark-matter/dark-generator";
import { DarkMatter } from "../dark-matter/dark-matter";
import { player } from "../player";
import { SpacetimePoints, Spacetime } from "../spacetime/spacetime";
import {
    resetUnlockedSpacetimeChallenges,
    SpacetimeChallenges
} from "../spacetime/spacetime-challenges";
import {
    SpacetimePointMultUpgrade,
    SpacetimeUpgrades
} from "../spacetime/spacetime-upgrades";
import {
    TearSpacetime,
    TearSpacetimeUpgrades
} from "../spacetime/tear-spacetime";
import { Tabs } from "../tabs";

export const Particles = new (class extends PrestigeCurrency {
    name = "particle";

    get amount() {
        return player.particles;
    }

    set amount(val) {
        player.particles = val;
    }

    get gainAmount() {
        if (SpacetimePoints.lt(ATOMIC_REQ)) return new Decimal(0);
        return new Decimal(3)
            .pow(SpacetimePoints.log10().div(ATOMIC_REQ.log10()).sub(1))
            .floor();
    }

    get nextRequirement() {
        return new Decimal(10).pow(
            this.gainAmount.add(1).log(3).add(1).mul(ATOMIC_REQ.log10())
        );
    }
})();

export const Atomic = new (class extends PrestigeLayer {
    readonly stylePreset = "atomic";

    currency = Particles;

    get requiredCurrency() {
        return SpacetimePoints;
    }

    get prestigeCount() {
        return player.statistics.atomicCount;
    }

    set prestigeCount(val) {
        player.statistics.atomicCount = val;
    }

    get canPrestige() {
        return Particles.gainAmount.gt(0);
    }

    reset() {
        Spacetime.prestigeCount = 0;
        SpacetimePoints.amount = new Decimal(0);
        SpacetimePointMultUpgrade.boughtAmount = 0;
        SpacetimePoints.highestPerMinute = new Decimal(0);
        Object.values(SpacetimeUpgrades).forEach((upg) => {
            upg.boughtAmount = 0;
        });
        Object.values(TearSpacetimeUpgrades).forEach((upg) => {
            upg.boughtAmount = 0;
        });
        Object.values(SpacetimeChallenges).forEach((chall) => {
            chall.completed = false;
        });
        resetUnlockedSpacetimeChallenges();
        DarkGenerators.forEach((gen) => {
            gen.boughtAmount = 0;
            gen.unlocked = false;
        });
        DarkMatter.amount = new Decimal(0);
        TearSpacetime.tore = false;
        Spacetime.reset();
    }

    postPrestige() {
        if (this.prestigeCount === 1) Tabs.tab("atomic").enter();
    }
})();
