<script setup lang="ts">
import NineSquareRaffle from './components/NineSquareRaffle.vue';
import Settings from './components/Settings.vue';
</script>

<template>
  <div grid place-items-center mt-10 gap-2 h="450px md:1/2">
    <NineSquareRaffle />
    <Settings />
  </div>
</template>

<style>
html,
body,
#app {
  @apply w-full h-full;
}
</style>
