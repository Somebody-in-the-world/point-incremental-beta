<script setup lang="ts">
import PurchasableDisplay from "@/components/shared/PurchasableDisplay.vue";
import StyledButton from "@/components/shared/StyledButton.vue";
import { type DarkGenerator } from "@/game/dark-matter/dark-generator";
import { format } from "@/game/format";

interface Props {
    darkGenerator: DarkGenerator;
}

const { darkGenerator } = defineProps<Props>();
</script>

<template>
    <PurchasableDisplay
        :purchasable="darkGenerator"
        v-slot="{ requiredCurrencyName, boughtAmount, cost, description }"
        v-if="darkGenerator.unlocked"
    >
        <strong>{{ description }}</strong> ({{ boughtAmount }})
        <br />
        <span v-if="darkGenerator.id === 0">
            Generating
            {{ format(darkGenerator.production) }} dark matter per second
        </span>
        <span v-else>
            Multiplying tier {{ darkGenerator.id }} dark generators' production
            by {{ format(darkGenerator.production) }}x
        </span>
        <br />
        Cost: {{ format(cost) }} {{ requiredCurrencyName }}
    </PurchasableDisplay>
    <StyledButton
        stylePreset="darkMatter"
        v-else
        :disabled="!darkGenerator.canUnlock"
        @click="darkGenerator.unlock()"
    >
        <strong>{{ darkGenerator.description }}</strong>
        <br />
        Reach {{ format(darkGenerator.requirement) }} points to unlock this dark
        generator
    </StyledButton>
</template>
