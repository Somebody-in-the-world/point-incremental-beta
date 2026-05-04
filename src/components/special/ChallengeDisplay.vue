<script setup lang="ts">
import { computed } from "vue";

import type { Challenge } from "@/game/challenges";
import { shouldDisplayEffect } from "@/game/core/effect";
import { format, pluralize } from "@/game/format";

import EffectDisplay from "../shared/EffectDisplay.vue";
import StyledButton from "../shared/StyledButton.vue";

interface Props {
    challenge: Challenge;
}

const { challenge } = defineProps<Props>();
const buttonText = computed(() => {
    if (challenge.running) {
        if (challenge.canComplete) return "Complete";
        return "Exit";
    }
    if (challenge.completed) return "Completed";
    return "Start";
});

function challengeAction() {
    if (challenge.running) {
        challenge.exit();
    } else {
        challenge.enter();
    }
}
</script>

<template>
    <div
        id="challenge"
        :style="challenge.stylePreset.normal"
        v-if="challenge.unlocked"
    >
        <strong style="font-size: 1.1em">{{ challenge.name }}</strong>
        <br />
        {{ challenge.description }}
        <br />
        Goal: {{ format(challenge.requirement) }}
        {{ pluralize(challenge.currency.name, challenge.requirement) }}
        <br />
        <div
            v-if="challenge.rewardDescription !== null"
            style="margin-top: 10px"
        >
            Reward: {{ challenge.rewardDescription }}
        </div>
        <div v-if="shouldDisplayEffect(challenge.config.rewardEffect)">
            Currently: <EffectDisplay :effect="challenge.rewardEffect" />
        </div>
        <StyledButton
            style="margin-top: 10px"
            @click="challengeAction()"
            :stylePreset="challenge.buttonStylePreset"
        >
            {{ buttonText }}
        </StyledButton>
    </div>
</template>

<style scoped>
#challenge {
    text-align: center;
    border: 2px solid;
    border-radius: 10px;
}

@media (max-width: 768px) {
    #challenge {
        padding: 10px;
    }
}

@media (min-width: 769px) {
    #challenge {
        padding: 25px;
    }
}
</style>
