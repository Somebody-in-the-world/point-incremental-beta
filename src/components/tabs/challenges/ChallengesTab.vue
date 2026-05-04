<script setup lang="ts">
import { computed } from "vue";

import InfoDisplay from "@/components/shared/InfoDisplay.vue";
import ChallengeDisplay from "@/components/special/ChallengeDisplay.vue";
import { format } from "@/game/format";
import {
    getFirstLockedSpacetimeChallenge,
    SpacetimeChallenges
} from "@/game/spacetime/spacetime-challenges";

const firstLockedChall = computed(() => getFirstLockedSpacetimeChallenge());
</script>

<template>
    <InfoDisplay v-if="firstLockedChall">
        {{
            firstLockedChall.numericID === 0
                ? "First challenge"
                : "Next challenge"
        }}
        unlocks at {{ format(firstLockedChall.unlockRequirement) }} points
    </InfoDisplay>
    <div id="challenge-container">
        <ChallengeDisplay
            :challenge
            v-for="(challenge, id) in SpacetimeChallenges"
            :key="id"
        />
    </div>
</template>

<style scoped>
#challenge-container {
    display: grid;
}

@media (max-width: 768px) {
    #challenge-container {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 769px) {
    #challenge-container {
        grid-template-columns: repeat(3, 1fr);
        margin: 0 15%;
        gap: 5px;
    }
}
</style>
