<script setup lang="ts">
import { computed } from "vue";

import type { Currency } from "@/game/core/currency";
import { pluralize } from "@/game/format";

interface Props {
    currency: Currency;
}

const { currency } = defineProps<Props>();

const currencyName = computed(() => pluralize(currency.name, currency.amount));
</script>

<template>
    <slot :amount="currency.amount" :currencyName></slot>
</template>
