<script setup lang="ts">
import { computed } from "vue";

import type { Effect } from "@/game/reusable/effect";

interface Props {
    effect: Effect;
    boughtAmount?: number;
}

const { effect, boughtAmount } = defineProps<Props>();

if (effect.formula.length === 1 && boughtAmount === undefined) {
    throw new Error("boughtAmount was not provided when it was needed");
}

const formattedEffect = computed(() =>
    effect.formatter?.(effect.formula(boughtAmount as number) ?? "")
);
</script>

<template>
    {{ formattedEffect }}
</template>
