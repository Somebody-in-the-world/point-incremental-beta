<script setup lang="ts">
import MilestoneDisplay from "@/components/reusable/MilestoneDisplay.vue";
import { SpacetimeMilestones } from "@/game/spacetime/spacetime-milestones";
</script>

<template>
    <MilestoneDisplay
        v-for="(milestone, idx) in SpacetimeMilestones"
        :key="idx"
        :milestone
    />
</template>
