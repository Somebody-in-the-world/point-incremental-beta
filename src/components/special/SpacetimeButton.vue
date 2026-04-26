<script setup lang="ts">
import { INFINITY } from "@/game/constants";
import { format } from "@/game/format";
import { SpacetimePrestige } from "@/game/spacetime/spacetime";

import PrestigeButton from "../reusable/PrestigeButton.vue";
</script>

<template>
    <PrestigeButton
        :prestigeLayer="SpacetimePrestige"
        #default="{ currencyName, gainAmount }"
        id="spacetime-button"
    >
        <span v-show="SpacetimePrestige.canPrestige">
            Spacetime for {{ format(gainAmount) }} {{ currencyName }}
        </span>
        <span v-show="!SpacetimePrestige.canPrestige">
            Get {{ format(INFINITY) }} points to spacetime
        </span>
    </PrestigeButton>
</template>

<style scoped>
#spacetime-button {
    height: 10vh;
}
</style>
