<script setup lang="ts">
import { computed, ref } from "vue";

import { pluralize } from "@/game/format";
import type { PrestigeLayerCounterless } from "@/game/reusable/prestige-layer";

interface Props {
    prestigeLayer: PrestigeLayerCounterless;
}

const { prestigeLayer } = defineProps<Props>();
const gainAmount = computed(() => prestigeLayer.currency.gainAmount);
const nextRequirement = computed(() => prestigeLayer.currency.nextRequirement);
const currencyName = computed(() =>
    pluralize(prestigeLayer.currency.name, gainAmount.value)
);

const hovered = ref(false);

const style = computed(() => {
    const preset = prestigeLayer.stylePreset;
    if (!prestigeLayer.canPrestige) return preset.disabled;
    if (hovered.value) return preset.hovered;
    return preset.normal;
});
</script>

<template>
    <button
        :disabled="gainAmount.lte(0)"
        @click="prestigeLayer.prestige()"
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
        :style
    >
        <slot :gainAmount :currencyName :nextRequirement></slot>
    </button>
</template>
