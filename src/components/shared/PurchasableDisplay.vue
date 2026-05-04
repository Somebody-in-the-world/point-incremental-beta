<script setup lang="ts">
import { computed, ref } from "vue";

import { shouldDisplayEffect } from "@/game/core/effect";
import type { PurchasableConfigless } from "@/game/core/purchasable";
import { format, pluralize } from "@/game/format";

import EffectDisplay from "./EffectDisplay.vue";

interface Props {
    purchasable: PurchasableConfigless;
    showEffect?: boolean;
    showNextEffect?: boolean;
}

const {
    purchasable,
    showEffect = true,
    showNextEffect = false
} = defineProps<Props>();

const displayEffect = computed(() =>
    shouldDisplayEffect(purchasable.effectObject)
);
const effect = computed(() =>
    displayEffect.value ? purchasable.effect : null
);
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
            <div v-if="displayEffect">
                <div v-if="showEffect">
                    Currently:
                    <EffectDisplay :effect="effect!" :boughtAmount />
                </div>
                <div v-if="showNextEffect && purchasable.repeatable">
                    Next:
                    <EffectDisplay
                        :effect="effect!"
                        :boughtAmount="boughtAmount + 1"
                    />
                </div>
            </div>
            <div v-if="!purchasable.reachedCap || !purchasable.repeatable">
                {{ purchasable.reduceCurrency ? "Cost" : "Requires" }}:
                {{ format(cost) }} {{ requiredCurrencyName }}
            </div>
        </slot>
    </button>
</template>
