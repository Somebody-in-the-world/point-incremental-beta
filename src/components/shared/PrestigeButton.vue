<script setup lang="ts">
import { computed, ref } from "vue";

import type { PrestigeLayerCounterless } from "@/game/core/prestige-layer";
import { pluralize } from "@/game/format";
import { CurrentTheme } from "@/game/themes";

interface Props {
    prestigeLayer: PrestigeLayerCounterless;
    prePrestige?: () => { continuePrestige?: boolean } | undefined;
    postPrestige?: () => void;
}

const { prePrestige, postPrestige, prestigeLayer } = defineProps<Props>();
const gainAmount = computed(() => prestigeLayer.currency.gainAmount);
const nextRequirement = computed(() => prestigeLayer.currency.nextRequirement);
const currencyName = computed(() =>
    pluralize(prestigeLayer.currency.name, gainAmount.value)
);

const hovered = ref(false);

const style = computed(() => {
    const preset = CurrentTheme.buttons(prestigeLayer.stylePreset);
    if (!prestigeLayer.canPrestige) return preset.disabled;
    if (hovered.value) return preset.hovered;
    return preset.normal;
});
</script>

<template>
    <button
        :disabled="gainAmount.lte(0)"
        @click="
            if (prePrestige?.()?.continuePrestige ?? true) {
                prestigeLayer.prestige();
                postPrestige?.();
            }
        "
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
        :style
    >
        <slot :gainAmount :currencyName :nextRequirement></slot>
    </button>
</template>
