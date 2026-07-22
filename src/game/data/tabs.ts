import AchievementsTab from "@/components/tabs/achievements/AchievementsTab.vue";
import ParticlesTab from "@/components/tabs/atomic/ParticlesTab.vue";
import AutobuyersTab from "@/components/tabs/autobuyers/AutobuyersTab.vue";
import ChallengesTab from "@/components/tabs/challenges/ChallengesTab.vue";
import DarkMatterTab from "@/components/tabs/dark-matter/DarkMatterTab.vue";
import DimensionalTab from "@/components/tabs/dimensional/DimensionalTab.vue";
import MainTab from "@/components/tabs/main/MainTab.vue";
import OptionsTab from "@/components/tabs/options/OptionsTab.vue";
import SpacetimeMilestonesTab from "@/components/tabs/spacetime/SpacetimeMilestonesTab.vue";
import SpacetimeUpgradesTab from "@/components/tabs/spacetime/SpacetimeUpgradesTab.vue";
import TearSpacetimeTab from "@/components/tabs/spacetime/TearSpacetimeTab.vue";

import { Progress } from "../progress";
import type { TabConfig } from "../tabs";

export const tabData = {
    main: { name: "Main", component: MainTab },
    autobuyers: {
        name: "Autobuyers",
        component: AutobuyersTab,
        unlockCondition: () => Progress.unlockedAutobuyers
    },
    challenges: {
        name: "Challenges",
        component: ChallengesTab,
        unlockCondition: () => Progress.unlockedChallenges
    },
    dimensional: {
        name: "Dimensional",
        component: DimensionalTab,
        unlockCondition: () => Progress.reachedDimensional
    },
    spacetime: {
        name: "Spacetime",
        unlockCondition: () => Progress.reachedSpacetime,
        subtabs: {
            upgrades: { name: "Upgrades", component: SpacetimeUpgradesTab },
            milestones: {
                name: "Milestones",
                component: SpacetimeMilestonesTab
            },
            tearSpacetime: {
                name: "Tear spacetime",
                component: TearSpacetimeTab
            }
        },
        style: "spacetime"
    },
    darkMatter: {
        name: "Dark matter",
        component: DarkMatterTab,
        style: "spacetime",
        unlockCondition: () => Progress.unlockedDarkMatter
    },
    atomic: {
        name: "Atomic",
        subtabs: { particles: { name: "Particles", component: ParticlesTab } },
        style: "atomic",
        unlockCondition: () => Progress.reachedAtomic
    },
    achievements: { name: "Achievements", component: AchievementsTab },
    options: { name: "Options", component: OptionsTab }
} as const satisfies Record<string, TabConfig>;
