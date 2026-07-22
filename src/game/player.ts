import Decimal from "break_eternity.js";
import { reactive } from "vue";

import type { PlayerAutobuyerConfig } from "./autobuyers";
import type { themesData } from "./data/themes";

// hack to make reactive not destroy types
function _reactive<T extends object>(val: T) {
    return reactive(val) as T;
}

export const player = _reactive({
    points: new Decimal(0),
    pointUpgrades: 0,
    compressedPoints: new Decimal(0),
    automationPointsUnlocked: 0,
    automationPoints: new Decimal(0),
    dimensionalPoints: new Decimal(0),
    dimensionalPower: new Decimal(0),
    dimensions: Array.from({ length: 8 }, () => ({
        bought: 0,
        generated: new Decimal(0)
    })),
    spacetimePoints: new Decimal(0),
    spacetimeUpgrades: {},
    spacetimePointMultUpgrade: 0,
    spacetimeTore: false,
    tearSpacetimeUpgrades: {},
    spacetimeChallenges: {},
    unlockedSpacetimeChallenges: 0,
    darkMatter: new Decimal(0),
    darkGenerators: Array.from({ length: 6 }, () => ({
        bought: 0,
        unlocked: false
    })),
    particles: new Decimal(0),
    protons: new Decimal(0),
    neutrons: new Decimal(0),
    electrons: new Decimal(0),
    electromagneticForce: new Decimal(0),
    strongForce: new Decimal(0),
    weakForce: new Decimal(0),
    autobuyers: {} as PlayerAutobuyerConfig,
    achievements: Array.from({ length: 100 }, () => false),
    statistics: {
        pointCompressionCount: 0,
        dimensionalCount: 0,
        spacetimeCount: 0,
        atomicCount: 0,
        timeInCurrentSpacetime: 0,
        fastestSpacetime: null as number | null,
        peakSPPerMinute: new Decimal(0),
        SPGainAtPeakPerMin: new Decimal(0),
        highestSPGainPerMinute: new Decimal(0),
        timePlayed: 0,
        totalPoints: new Decimal(0)
    },
    options: { theme: "dark" as keyof typeof themesData }
});
