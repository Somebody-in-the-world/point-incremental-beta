<script setup lang="ts">
import type { ElementStyles } from "@/game/themes";

interface Props {
    stylePreset: ElementStyles;
}

const { stylePreset } = defineProps<Props>();
const style = stylePreset.normal;
</script>

<template>
    <slot :style></slot>
</template>
