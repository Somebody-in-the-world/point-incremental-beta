<script setup lang="ts">
import { format } from "@/game/format";
import { SpacetimePoints, SpacetimePrestige } from "@/game/spacetime/spacetime";
import { getRunningSpacetimeChallenge } from "@/game/spacetime/spacetime-challenges";

import PrestigeButton from "../reusable/PrestigeButton.vue";
</script>

<template>
    <PrestigeButton
        :prestigeLayer="SpacetimePrestige"
        #default="{ currencyName, gainAmount }"
        id="spacetime-button"
    >
        <div v-show="SpacetimePrestige.canPrestige">
            <span v-show="getRunningSpacetimeChallenge()">
                Spacetime to complete challenge
            </span>
            <span v-show="!getRunningSpacetimeChallenge()">
                Spacetime for {{ format(gainAmount) }} {{ currencyName }}
                <br />
                <span style="font-size: 0.8em">
                    ({{ format(SpacetimePoints.gainPerMinute) }} SP/min, peak
                    {{ format(SpacetimePoints.peakPerMinute) }} SP/min at
                    {{ format(SpacetimePoints.gainAtPeakPerMinute) }} SP)
                </span>
            </span>
        </div>
        <span v-show="!SpacetimePrestige.canPrestige">
            Get {{ format(SpacetimePrestige.prestigeRequirement) }} points to
            spacetime
        </span>
    </PrestigeButton>
</template>

<style scoped>
#spacetime-button {
    min-height: 10vh;
}
</style>
