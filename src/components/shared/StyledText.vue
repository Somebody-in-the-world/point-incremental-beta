<script setup lang="ts">
import { computed, type CSSProperties } from "vue";

import { CurrentTheme, type AvailablePresets } from "@/game/themes";

interface Props {
    stylePreset: AvailablePresets<"text">;
    additionalStyles?: CSSProperties;
}

const { stylePreset, additionalStyles } = defineProps<Props>();
const style = computed(() => CurrentTheme.text(stylePreset).normal);
</script>

<template>
    <span :style="[style, additionalStyles]">
        <slot></slot>
    </span>
</template>
