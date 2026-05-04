<script setup lang="ts">
import { computed, ref } from "vue";

import type { ButtonStyles } from "@/game/themes";

interface Props {
    stylePreset: ButtonStyles;
    disabled?: boolean;
}

const { stylePreset, disabled = false } = defineProps<Props>();

const hovered = ref(false);
const style = computed(() => {
    if (disabled) return stylePreset.disabled;
    if (hovered.value) return stylePreset.hovered;
    return stylePreset.normal;
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
