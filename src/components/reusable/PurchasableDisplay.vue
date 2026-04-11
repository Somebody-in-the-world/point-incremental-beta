<script setup lang="ts">
import { computed, ref } from "vue";

import { format, pluralize } from "@/game/format";
import type { PurchasableConfigless } from "@/game/reusable/purchasable";

import EffectDisplay from "./EffectDisplay.vue";

interface Props {
    purchasable: PurchasableConfigless;
    showEffect?: boolean;
    showNextEffect?: boolean;
}

const {
    purchasable,
    showEffect = true,
    showNextEffect = true
} = defineProps<Props>();

const effect = computed(() => purchasable.effectObject);
const boughtAmount = computed(() => purchasable.boughtAmount);
const requiredCurrencyName = computed(() =>
    pluralize(purchasable.currency.name, purchasable.cost)
);
const cost = computed(() => purchasable.cost);

const hovered = ref(false);

const style = computed(() => {
    const preset = purchasable.stylePreset;
    if (purchasable.reachedCap) {
        return preset.purchased;
    }

    if (!purchasable.canPurchase) {
        return preset.unpurchasable;
    }

    if (hovered.value) {
        return preset.hovered;
    }

    return preset.normal;
});
</script>

<template>
    <button
        :disabled="!purchasable.canPurchase"
        @click="purchasable.purchase()"
        :style
        @mouseenter="hovered = true"
        @mouseleave="hovered = false"
    >
        <slot
            :description="purchasable.description"
            :cost
            :requiredCurrencyName
            :boughtAmount
            :effect
        >
            {{ purchasable.description }}
            <br />
            {{ purchasable.reduceCurrency ? "Cost" : "Requires" }}:
            {{ format(cost) }} {{ requiredCurrencyName }}
            <div v-if="effect !== null">
                <div v-if="showEffect">
                    Currently:
                    <EffectDisplay :effect :boughtAmount />
                </div>
                <div v-if="showNextEffect && purchasable.repeatable">
                    Next:
                    <EffectDisplay :effect :boughtAmount="boughtAmount + 1" />
                </div>
            </div>
        </slot>
    </button>
</template>
