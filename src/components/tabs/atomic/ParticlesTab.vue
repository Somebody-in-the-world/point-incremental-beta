<script setup lang="ts">
import EffectDisplay from "@/components/shared/EffectDisplay.vue";
import StyledText from "@/components/shared/StyledText.vue";
import ParticlesDisplay from "@/components/special/ParticlesDisplay.vue";
import {
    Electrons,
    Neutrons,
    Protons
} from "@/game/atomic/atom-constituents.ts";
import {
    ElectromagneticForce,
    StrongForce,
    WeakForce
} from "@/game/atomic/forces.ts";

import AtomConstituentDisplay from "./AtomConstituentDisplay.vue";
</script>

<template>
    <div class="horizontally-centered">
        <div>
            <ParticlesDisplay />
        </div>
    </div>
    <div class="horizontally-centered">
        <div id="atom-constituents-container">
            <AtomConstituentDisplay
                :atomConstituent="Protons"
                :force="ElectromagneticForce"
                textStylePreset="proton"
                #default="{ effect }"
            >
                point gain
                <StyledText stylePreset="proton">
                    <EffectDisplay :effect />
                </StyledText>
            </AtomConstituentDisplay>
            <AtomConstituentDisplay
                :atomConstituent="Neutrons"
                :force="StrongForce"
                textStylePreset="neutron"
                #default="{ effect }"
            >
                dimension per-purchase multiplier
                <StyledText stylePreset="neutron">
                    <EffectDisplay :effect />
                </StyledText>
            </AtomConstituentDisplay>
            <AtomConstituentDisplay
                :atomConstituent="Electrons"
                :force="WeakForce"
                textStylePreset="electron"
                #default="{ effect }"
            >
                dark matter boost exponent
                <StyledText stylePreset="electron">
                    <EffectDisplay :effect />
                </StyledText>
            </AtomConstituentDisplay>
        </div>
    </div>
</template>

<style scoped>
.horizontally-centered {
    display: flex;
    justify-content: center;
    width: 100%;
}

#atom-constituents-container {
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr;
}

@media (min-width: 769px) {
    #atom-constituents-container {
        width: 80%;
    }
}
</style>
