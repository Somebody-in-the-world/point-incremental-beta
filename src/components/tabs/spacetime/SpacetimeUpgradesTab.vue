<script setup lang="ts">
import PurchasableDisplay from "@/components/shared/PurchasableDisplay.vue";
import PurchasableGrid from "@/components/shared/PurchasableGrid.vue";
import {
    SpacetimePointMultUpgrade,
    SpacetimeUpgrades
} from "@/game/spacetime/spacetime-upgrades";
</script>

<template>
    <PurchasableDisplay
        :purchasable="SpacetimePointMultUpgrade"
        id="spacetime-point-mult-upgrade"
    />
    <br />
    <PurchasableGrid :purchasableItems="SpacetimeUpgrades" />
</template>

<style scoped>
#spacetime-point-mult-upgrade {
    margin: auto;
    display: block;
}

@media (max-width: 768px) {
    #spacetime-point-mult-upgrade {
        width: 100%;
    }
}

@media (min-width: 769px) {
    #spacetime-point-mult-upgrade {
        width: 35%;
    }
}
</style>
