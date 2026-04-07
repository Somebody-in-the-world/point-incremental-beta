<script setup lang="ts">
import { SubTab, Tab } from "@/game/tabs";

interface Props {
    tabs: Record<string, Tab | SubTab>;
    currentTab: Tab | SubTab;
}

const { tabs } = defineProps<Props>();
</script>

<template>
    <button
        v-for="(tab, idx) in tabs"
        :key="idx"
        :disabled="tab.isCurrent"
        @click="tab.enter()"
        v-show="tab.unlocked"
    >
        {{ tab.name }}
    </button>
    <div v-if="currentTab.subtabs">
        <hr />
        <TabSwitcher
            :tabs="currentTab.subtabs"
            :currentTab="currentTab.currentSubTab!"
        />
    </div>
</template>
