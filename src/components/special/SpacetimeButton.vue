<script setup lang="ts">
import { computed } from "vue";

import { format } from "@/game/format";
import { SpacetimePoints, Spacetime } from "@/game/spacetime/spacetime";
import { getRunningSpacetimeChallenge } from "@/game/spacetime/spacetime-challenges";

import PrestigeButton from "../shared/PrestigeButton.vue";

const isInChallenge = computed(
    () => getRunningSpacetimeChallenge() !== undefined
);
</script>

<template>
    <PrestigeButton
        :prestigeLayer="Spacetime"
        #default="{ currencyName, gainAmount }"
        id="spacetime-button"
    >
        <div v-show="Spacetime.canPrestige">
            <span v-show="isInChallenge">
                Spacetime to complete challenge
            </span>
            <span v-show="!isInChallenge">
                Spacetime for {{ format(gainAmount) }} {{ currencyName }}
                <span v-if="SpacetimePoints.gainAmount.lt(1e50)">
                    <br />
                    <span style="font-size: 0.8em">
                        ({{ format(SpacetimePoints.gainPerMinute) }} SP/min,
                        peak {{ format(SpacetimePoints.peakPerMinute) }} SP/min
                        at {{ format(SpacetimePoints.gainAtPeakPerMinute) }} SP)
                    </span>
                </span>
            </span>
        </div>
        <span v-show="!Spacetime.canPrestige">
            Reach {{ format(Spacetime.prestigeRequirement) }} points to
            {{ isInChallenge ? "complete challenge" : "spacetime" }}
        </span>
    </PrestigeButton>
</template>

<style scoped>
#spacetime-button {
    min-height: 10vh;
}
</style>
