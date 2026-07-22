<script setup lang="ts">
import CurrencyDisplay from "@/components/shared/CurrencyDisplay.vue";
import StyledText from "@/components/shared/StyledText.vue";
import type { AtomConstituent } from "@/game/atomic/atom-constituents";
import { Particles } from "@/game/atomic/atomic";
import type { Force } from "@/game/atomic/forces";
import { format } from "@/game/format";
import type { AvailablePresets } from "@/game/themes";

interface Props {
    atomConstituent: AtomConstituent;
    force: Force;
    textStylePreset?: AvailablePresets<"text">;
}

const {
    atomConstituent,
    force,
    textStylePreset = "unstyled"
} = defineProps<Props>();
</script>

<template>
    <div>
        <h4 style="text-align: center">
            <CurrencyDisplay
                :currency="atomConstituent"
                #default="{ amount, currencyName }"
            >
                You have
                <StyledText :stylePreset="textStylePreset">
                    {{ format(amount) }}
                </StyledText>
                {{ currencyName }}, creating
                <StyledText :stylePreset="textStylePreset">
                    {{ format(atomConstituent.effect) }}
                </StyledText>
                {{ force.name }} per second
            </CurrencyDisplay>
            <br />
            <CurrencyDisplay
                :currency="force"
                #default="{ amount, currencyName }"
            >
                You have
                <StyledText :stylePreset="textStylePreset">
                    {{ format(amount) }}
                </StyledText>
                {{ currencyName }}, <slot :effect="force.effect"></slot>
            </CurrencyDisplay>
        </h4>
        <div style="text-align: center">
            <button
                @click="atomConstituent.assignOne()"
                :disabled="Particles.lt(1)"
            >
                Assign 1 particle
            </button>
            <br />
            <button @click="atomConstituent.assignAll()">
                Assign all particles
            </button>
        </div>
    </div>
</template>
