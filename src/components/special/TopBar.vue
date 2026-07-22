<script setup lang="ts">
import { DarkGenerators } from "@/game/dark-matter/dark-generator.ts";

import AtomicButton from "./AtomicButton.vue";
import DarkMatterUnlockButton from "./DarkMatterUnlockButton.vue";
import SpacetimeButton from "./SpacetimeButton.vue";
</script>

<template>
    <div id="top-bar">
        <SpacetimeButton />
        <template v-if="DarkGenerators.at(-1)?.unlocked">
            <AtomicButton />
        </template>
        <template v-else>
            <DarkMatterUnlockButton />
        </template>
    </div>
</template>

<style scoped>
#top-bar {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}
</style>
