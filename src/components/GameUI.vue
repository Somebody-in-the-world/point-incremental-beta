<script setup lang="ts">
import { computed } from "vue";

import { Progress } from "@/game/progress";
import { Tabs } from "@/game/tabs";

import PointDisplay from "./special/PointDisplay.vue";
import SpacetimeButton from "./special/SpacetimeButton.vue";
import TabSwitcher from "./tabs/TabSwitcher.vue";

const forceSpacetime = computed(() => Progress.reachedInfinitePoints);
</script>

<template>
    <PointDisplay />
    <SpacetimeButton v-if="forceSpacetime" />
    <div v-if="!forceSpacetime">
        <TabSwitcher :tabs="Tabs.tabs" :currentTab="Tabs.current" />
        <hr />
        <component :is="Tabs.currentTabComponent" />
    </div>
</template>
