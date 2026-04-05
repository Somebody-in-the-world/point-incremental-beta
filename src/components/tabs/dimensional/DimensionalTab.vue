<script setup lang="ts">
import PrestigeLayerButton from "@/components/reusable/PrestigeLayerButton.vue";
import {
    DimensionalPoints,
    DimensionalPrestige
} from "@/game/dimensional/dimensional";
import { DimensionalPower } from "@/game/dimensional/dimensional-power";
import { Dimensions } from "@/game/dimensional/dimensions";
import { format } from "@/game/format";
import { Progress } from "@/game/progress";

import DimensionDisplay from "./DimensionDisplay.vue";
</script>

<template>
    <h3>You have {{ format(DimensionalPoints.amount) }} dimensional points</h3>
    <PrestigeLayerButton
        :prestigeLayer="DimensionalPrestige"
        #default="{ gainAmount, currencyName, nextRequirement }"
    >
        Convert your points into {{ format(gainAmount) }} {{ currencyName }}
        <span v-if="gainAmount.lt(100)">
            (Next at {{ format(nextRequirement) }} points)
        </span>
    </PrestigeLayerButton>
    <div v-if="Progress.reachedDimensional">
        <h3>
            You have {{ format(DimensionalPower.amount) }} dimensional power,
            adding a {{ format(DimensionalPower.effect.mul(100)) }}% multiplier
            to point upgrade
        </h3>
        <h4>
            You are getting
            {{ format(DimensionalPower.continuousGainAmount) }} dimensional
            power per second
        </h4>
        <DimensionDisplay
            v-for="(dim, idx) in Dimensions"
            :dimension="dim"
            :key="idx"
            v-show="Dimensions[idx]?.unlocked"
        />
    </div>
</template>
