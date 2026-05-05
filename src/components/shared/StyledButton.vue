<script setup lang="ts">
import { computed, ref } from "vue";

import { CurrentTheme } from "@/game/themes";

interface Props {
    stylePreset: Parameters<typeof CurrentTheme.buttons>[0];
    disabled?: boolean;
}

const { stylePreset, disabled = false } = defineProps<Props>();

const hovered = ref(false);
const style = computed(() => {
    const presetObject = CurrentTheme.buttons(stylePreset);
    if (disabled) return presetObject.disabled;
    if (hovered.value) return presetObject.hovered;
    return presetObject.normal;
});
</script>

<template>
    <button
        :disabled
        :style
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
    >
        <slot></slot>
    </button>
</template>
