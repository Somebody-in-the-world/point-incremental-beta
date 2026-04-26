<script setup lang="ts">
import { SubTab, Tab } from "@/game/tabs";

import StyledButton from "../reusable/StyledButton.vue";

interface Props {
    tabs: Record<string, Tab | SubTab>;
    currentTab: Tab | SubTab;
}

const { tabs } = defineProps<Props>();
</script>

<template>
    <StyledButton
        v-for="(tab, idx) in tabs"
        :key="idx"
        :disabled="tab.isCurrent"
        @click="tab.enter()"
        v-show="tab.unlocked"
        :stylePreset="tab.stylePreset"
    >
        {{ tab.name }}
    </StyledButton>
    <div v-if="currentTab.subtabs">
        <hr />
        <TabSwitcher
            :tabs="currentTab.subtabs"
            :currentTab="currentTab.currentSubTab!"
        />
    </div>
</template>
