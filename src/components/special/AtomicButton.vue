<script setup lang="ts">
import { Atomic } from "@/game/atomic/atomic";
import { ATOMIC_REQ } from "@/game/constants.ts";
import { format } from "@/game/format.ts";
import { Progress } from "@/game/progress.ts";

import PrestigeButton from "../shared/PrestigeButton.vue";

function confirmPrestige() {
    return {
        continuePrestige: window.confirm(
            "Are you sure you want to go atomic? It might take a long time to get back here!"
        )
    };
}
</script>

<template>
    <PrestigeButton
        :prestigeLayer="Atomic"
        #default="{ gainAmount, nextRequirement, currencyName }"
        :prePrestige="confirmPrestige"
    >
        <span v-if="Atomic.canPrestige">
            <span v-if="Progress.reachedAtomic">
                Go atomic for {{ format(gainAmount) }} {{ currencyName }}
                <span v-show="gainAmount.lt(1000)">
                    (Next at {{ format(nextRequirement) }} SP)
                </span>
            </span>
            <span v-else> Go atomic. </span>
        </span>
        <span v-else>
            Reach {{ format(ATOMIC_REQ) }} spacetime points to go atomic
        </span>
    </PrestigeButton>
</template>
