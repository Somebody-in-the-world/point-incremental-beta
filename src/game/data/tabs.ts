import AchievementsTab from "@/components/tabs/achievements/AchievementsTab.vue";
import AutobuyersTab from "@/components/tabs/autobuyers/AutobuyersTab.vue";
import ChallengesTab from "@/components/tabs/challenges/ChallengesTab.vue";
import DimensionalTab from "@/components/tabs/dimensional/DimensionalTab.vue";
import MainTab from "@/components/tabs/main/MainTab.vue";
import OptionsTab from "@/components/tabs/options/OptionsTab.vue";
import SpacetimeMilestonesTab from "@/components/tabs/spacetime/SpacetimeMilestonesTab.vue";
import SpacetimeUpgradesTab from "@/components/tabs/spacetime/SpacetimeUpgradesTab.vue";
import TearSpacetimeTab from "@/components/tabs/spacetime/TearSpacetimeTab.vue";

import { Autobuyers } from "../autobuyers";
import { DimensionalPrestige } from "../dimensional/dimensional";
import { AutomationPointsUnlock } from "../main/automation-points";
import { Progress } from "../progress";
import { TearSpacetime } from "../spacetime/tear-spacetime";
import type { TabConfig } from "../tabs";
import { CurrentTheme } from "../themes";

export const tabData = {
    main: { name: "Main", component: MainTab },
    autobuyers: {
        name: "Autobuyers",
        component: AutobuyersTab,
        unlockCondition: () =>
            Object.values(Autobuyers).some((autobuyer) => autobuyer.unlocked)
    },
    challenges: {
        name: "Challenges",
        component: ChallengesTab,
        unlockCondition: () => TearSpacetime.tore
    },
    dimensional: {
        name: "Dimensional",
        component: DimensionalTab,
        unlockCondition: () =>
            Boolean(
                AutomationPointsUnlock.boughtAmount ||
                DimensionalPrestige.prestigeCount
            )
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
        component: MainTab,
        get style() {
            return CurrentTheme.buttons("spacetime");
        }
    },
    achievements: { name: "Achievements", component: AchievementsTab },
    options: { name: "Options", component: OptionsTab }
} as const satisfies Record<string, TabConfig>;
