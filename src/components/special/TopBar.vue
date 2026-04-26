<script setup lang="ts">
import SpacetimeButton from "./SpacetimeButton.vue";
</script>

<template>
    <div id="top-bar">
        <SpacetimeButton />
    </div>
</template>

<style scoped>
#top-bar {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}
</style>
