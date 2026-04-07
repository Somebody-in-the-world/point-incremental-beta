<script setup lang="ts">
import PurchasableGrid from "@/components/reusable/PurchasableGrid.vue";
import { SpacetimeUpgrades } from "@/game/spacetime/spacetime-upgrades";
</script>

<template>
    <PurchasableGrid :purchasableItems="SpacetimeUpgrades" />
</template>
