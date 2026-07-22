import Decimal from "break_eternity.js";

import { Currency } from "@/game/core/currency";
import { withEffects } from "@/game/core/effect";

import { Achievements } from "../achievements";
import { ElectromagneticForce } from "../atomic/forces";
import { DarkMatter } from "../dark-matter/dark-matter";
import { player } from "../player";
import { SpacetimeChallenges } from "../spacetime/spacetime-challenges";
import { SpacetimeUpgrades } from "../spacetime/spacetime-upgrades";
import { TearSpacetimeUpgrades } from "../spacetime/tear-spacetime";
import { AutomationPoints } from "./automation-points";
import { CompressedPoints } from "./compressed-points";
import { PointUpgrade } from "./point-upgrade";

export const Points = new (class extends Currency {
    name = "point";

    get amount() {
        return player.points;
    }

    set amount(value) {
        player.points = value;
    }

    get total() {
        return player.statistics.totalPoints;
    }

    set total(value) {
        player.statistics.totalPoints = value;
    }

    get gainAmount(): Decimal {
        let pointGain = new Decimal(1);
        pointGain = withEffects(pointGain)
            .apply(PointUpgrade.effect)
            .apply(CompressedPoints.effect)
            .apply(SpacetimeUpgrades.timeMult.effect)
            .apply(SpacetimeUpgrades.pointSelfBoost.effect)
            .apply(Achievements.getByID("a21").rewardEffect)
            .apply(Achievements.getByID("a26").rewardEffect)
            .apply(TearSpacetimeUpgrades.totalPointBoost.effect)
            .apply(TearSpacetimeUpgrades.spacetimePointBoost.effect)
            .apply(SpacetimeChallenges.dimPowMult.rewardEffect)
            .apply(DarkMatter.effect).value;
        if (SpacetimeChallenges.pointGainSqrt.running) {
            pointGain = pointGain.sqrt();
        }
        if (SpacetimeChallenges.pointDiv.running) {
            pointGain = pointGain.div("1e10000");
        }
        if (Achievements.getByID("a61").completed) {
            pointGain = pointGain.mul(1000);
        }
        pointGain = withEffects(pointGain)
            .apply(SpacetimeChallenges.pointGainSqrt.rewardEffect)
            .apply(ElectromagneticForce.effect).value;
        return pointGain;
    }

    get continuousGainAmount(): Decimal {
        return this.gainAmount.mul(AutomationPoints.effect);
    }

    postGain(gainAmount: Decimal) {
        this.total = this.total.add(gainAmount);
    }

    postContinousGain(gainAmount: Decimal) {
        this.total = this.total.add(gainAmount);
    }
})();
