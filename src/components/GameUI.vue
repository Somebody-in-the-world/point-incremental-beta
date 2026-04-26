<script setup lang="ts">
import { computed } from "vue";

import { Progress } from "@/game/progress";
import { SpacetimePrestige } from "@/game/spacetime/spacetime";
import { TearSpacetime } from "@/game/spacetime/tear-spacetime";
import { Tabs } from "@/game/tabs";

import ForcedSpacetimeButton from "./special/ForcedSpacetimeButton.vue";
import PointDisplay from "./special/PointDisplay.vue";
import SpacetimePointsDisplay from "./special/SpacetimePointsDisplay.vue";
import TopBar from "./special/TopBar.vue";
import TabSwitcher from "./tabs/TabSwitcher.vue";

const forceSpacetime = computed(
    () => Progress.reachedInfinitePoints && !TearSpacetime.tore
);
const showTabContent = computed(() =>
    SpacetimePrestige.fastestSpacetime < 20 ? true : !forceSpacetime.value
);
</script>

<template>
    <TopBar v-if="TearSpacetime.tore" />
    <SpacetimePointsDisplay />
    <PointDisplay />
    <ForcedSpacetimeButton v-if="forceSpacetime" />
    <div v-if="showTabContent">
        <!-- TODO: fix this -->
        <TabSwitcher
            :tabs="Tabs.tabs as any"
            :currentTab="Tabs.current as any"
        />
        <hr />
        <component :is="Tabs.currentTabComponent" />
    </div>
</template>
