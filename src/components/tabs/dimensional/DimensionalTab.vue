<script setup lang="ts">
import PrestigeLayerButton from "@/components/reusable/PrestigeButton.vue";
import {
    DimensionalPoints,
    DimensionalPrestige
} from "@/game/dimensional/dimensional";
import { DimensionalPower } from "@/game/dimensional/dimensional-power";
import { Dimensions } from "@/game/dimensional/dimensions";
import { format } from "@/game/format";
import { Progress } from "@/game/progress";
import { SpacetimeChallenges } from "@/game/spacetime/spacetime-challenges";

import DimensionDisplay from "./DimensionDisplay.vue";

function maxAllDims() {
    for (let i = 7; i >= 0; i--) {
        Dimensions[i]?.bulkPurchase();
    }
}

function resetDims() {
    for (let i = 0; i < 8; i++) {
        Dimensions[i]!.boughtAmount = 0;
    }
    DimensionalPrestige.reset();
}
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
        <h4 style="margin-bottom: 2px">
            You are getting
            {{ format(DimensionalPower.continuousGainAmount) }} dimensional
            power per second
        </h4>
        <div style="text-align: center; margin: 5px">
            <div
                v-if="SpacetimeChallenges.dimMultDiv.running"
                style="margin: 10px"
            >
                <button @click="resetDims()">
                    Reset all dimensions and force a dimensional reset
                </button>
            </div>
            <button @click="maxAllDims()">Max all</button>
        </div>
        <DimensionDisplay
            v-for="(dim, idx) in Dimensions"
            :dimension="dim"
            :key="idx"
            v-show="Dimensions[idx]?.unlocked || Progress.reachedSpacetime"
        />
    </div>
</template>
