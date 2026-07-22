<script setup lang="ts">
import { Particles } from "@/game/atomic/atomic";
import { format } from "@/game/format";
import { Progress } from "@/game/progress";

import CurrencyDisplay from "../shared/CurrencyDisplay.vue";
import StyledText from "../shared/StyledText.vue";
</script>

<template>
    <CurrencyDisplay
        :currency="Particles"
        #default="{ amount, currencyName }"
        v-if="Progress.reachedAtomic"
    >
        <h4 style="display: inline">
            You have
            <StyledText
                stylePreset="atomic"
                :additionalStyles="{
                    textShadow: '1px 1px 5px',
                    fontSize: '1.25rem',
                    fontWeight: 'normal'
                }"
                >{{ format(amount) }}</StyledText
            >
            {{ currencyName }}
        </h4>
    </CurrencyDisplay>
</template>
