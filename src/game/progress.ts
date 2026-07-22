import { Atomic } from "./atomic/atomic";
import { Autobuyers } from "./autobuyers";
import { INFINITY } from "./constants";
import { DarkGenerators } from "./dark-matter/dark-generator";
import { Dimensional } from "./dimensional/dimensional";
import { AutomationPointsUnlock } from "./main/automation-points";
import { CompressedPointsPrestige } from "./main/compressed-points";
import { PointUpgrade } from "./main/point-upgrade";
import { Points } from "./main/points";
import { Spacetime } from "./spacetime/spacetime";
import { TearSpacetime } from "./spacetime/tear-spacetime";

export const Progress = {
    get reachedPointUpgrades(): boolean {
        return (
            Points.gte(10) ||
            PointUpgrade.boughtAmount > 0 ||
            this.reachedPointCompression
        );
    },

    get reachedPointCompression() {
        return (
            CompressedPointsPrestige.prestigeCount > 0 ||
            Points.gte(100) ||
            this.reachedDimensional
        );
    },

    get reachedAutomationPoints() {
        return (
            CompressedPointsPrestige.prestigeCount > 0 ||
            this.reachedDimensional
        );
    },

    get unlockedDimensionalTab() {
        return (
            AutomationPointsUnlock.bought ||
            Dimensional.prestigeCount > 0 ||
            this.reachedSpacetime
        );
    },

    get reachedDimensional() {
        return Dimensional.prestigeCount > 0 || this.reachedSpacetime;
    },

    get reachedInfinitePoints() {
        return Points.gte(INFINITY);
    },

    get reachedSpacetime() {
        return Spacetime.prestigeCount > 0 || this.reachedAtomic;
    },

    get unlockedAutobuyers() {
        return (
            Object.values(Autobuyers).some((autobuyer) => autobuyer.unlocked) ||
            this.reachedAtomic
        );
    },

    get unlockedChallenges() {
        return TearSpacetime.tore || this.reachedAtomic;
    },

    get unlockedDarkMatter() {
        return (
            DarkGenerators.findIndex((gen) => gen.unlocked) !== -1 ||
            this.reachedAtomic
        );
    },

    get reachedAtomic() {
        return Atomic.prestigeCount > 0;
    }
};
