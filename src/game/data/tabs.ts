import AchievementsTab from "@/components/tabs/achievements/AchievementsTab.vue";
import DimensionalTab from "@/components/tabs/dimensional/DimensionalTab.vue";
import MainTab from "@/components/tabs/main/MainTab.vue";
import SpacetimeUpgradesTab from "@/components/tabs/spacetime/SpacetimeUpgradesTab.vue";

import { DimensionalPrestige } from "../dimensional/dimensional";
import { AutomationPointsUnlock } from "../main/automation-points";
import { Progress } from "../progress";
import type { TabConfig } from "../tabs";

export const tabData = {
    main: { name: "Main", component: MainTab },
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
            milestones: { name: "Milestones", component: MainTab }
        },
        component: MainTab
    },
    achievements: { name: "Achievements", component: AchievementsTab }
} as const satisfies Record<string, TabConfig>;
