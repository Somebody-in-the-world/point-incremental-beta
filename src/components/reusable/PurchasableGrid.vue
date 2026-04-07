<script setup lang="ts">
import type { Purchasable } from "@/game/reusable/purchasable";

import PurchasableDisplay from "./PurchasableDisplay.vue";

interface Props {
    purchasableItems: Record<string, Purchasable>;
}

const { purchasableItems } = defineProps<Props>();
</script>

<template>
    <div id="purchasable-container">
        <PurchasableDisplay
            :purchasable
            v-for="(purchasable, idx) in purchasableItems"
            :key="idx"
        />
    </div>
</template>

<style scoped>
#purchasable-container {
    display: grid;
}

@media (max-width: 768px) {
    #purchasable-container {
        grid-template-columns: repeat(2, 1fr);
    }
}

@media (min-width: 769px) {
    #purchasable-container {
        grid-template-columns: repeat(4, 1fr);
        margin: 0 15%;
        gap: 5px;
    }
}
</style>
