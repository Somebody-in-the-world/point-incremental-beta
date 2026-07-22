<script setup lang="ts">
import { computed } from "vue";

import { DarkGenerators } from "@/game/dark-matter/dark-generator";
import { format } from "@/game/format";

import StyledButton from "../shared/StyledButton.vue";

const lastLockedDarkGeneratorIndex = computed(() =>
    DarkGenerators.findIndex((gen) => !gen.unlocked)
);
const lastLockedDarkGenerator = computed(
    () => DarkGenerators[lastLockedDarkGeneratorIndex.value]
);
const nextRequirement = computed(
    () => lastLockedDarkGenerator.value?.requirement
);
const canUnlockNextDarkGenerator = computed(
    () => lastLockedDarkGenerator.value?.canUnlock
);
</script>

<template>
    <StyledButton
        stylePreset="spacetime"
        :disabled="!canUnlockNextDarkGenerator"
        @click="lastLockedDarkGenerator?.unlock()"
    >
        <span v-if="!canUnlockNextDarkGenerator">
            <span v-if="nextRequirement">
                Reach {{ format(nextRequirement) }} points to unlock
                {{
                    lastLockedDarkGeneratorIndex === 0
                        ? "dark matter"
                        : "a new dark generator"
                }}
            </span>
            <span v-else> You win! </span>
        </span>
        <span v-else>
            Unlock
            {{
                lastLockedDarkGeneratorIndex === 0
                    ? "dark matter"
                    : "a new dark generator"
            }}
        </span>
    </StyledButton>
</template>
