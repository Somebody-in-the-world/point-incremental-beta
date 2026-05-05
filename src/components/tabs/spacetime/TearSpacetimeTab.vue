<script setup lang="ts">
import InfoDisplay from "@/components/shared/InfoDisplay.vue";
import PurchasableGrid from "@/components/shared/PurchasableGrid.vue";
import StyledButton from "@/components/shared/StyledButton.vue";
import { format } from "@/game/format";
import {
    TearSpacetime,
    TearSpacetimeUpgrades
} from "@/game/spacetime/tear-spacetime";
</script>

<template>
    <InfoDisplay v-if="!TearSpacetime.canTear && !TearSpacetime.tore">
        You must have {{ format(TearSpacetime.requirement) }} spacetime points
        before you can tear spacetime
    </InfoDisplay>
    <StyledButton
        @click="TearSpacetime.tear()"
        stylePreset="spacetime"
        id="tear-spacetime-btn"
        :disabled="TearSpacetime.tore"
        v-else
    >
        {{ TearSpacetime.tore ? "Spacetime tore" : "Tear spacetime" }}
    </StyledButton>
    <PurchasableGrid
        :purchasableItems="TearSpacetimeUpgrades"
        v-if="TearSpacetime.tore"
    />
</template>

<style scoped>
#tear-spacetime-btn {
    margin: auto;
    display: block;
    font-size: 2.5em;
    border: 2px solid;
    transition: all 1s;
    border-radius: 0;
}

@media (max-width: 768px) {
    #tear-spacetime-btn {
        width: 100%;
        height: 10vh;
    }
}

@media (min-width: 769px) {
    #tear-spacetime-btn {
        width: 80%;
        height: 20vh;
        margin-bottom: 32px;
    }
}
</style>
