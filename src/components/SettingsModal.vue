<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script setup lang="ts">
import { VueFinalModal } from 'vue-final-modal';

defineEmits(['cancel', 'confirm']);
</script>

<template>
  <VueFinalModal
    name="settings-modal"
    v-slot="{ params, close }"
    v-bind="$attrs"
    classes="flex justify-center items-center"
    content-class="relative flex flex-col max-h-120 mx-4 p-4 border dark:border-gray-800 rounded bg-white dark:bg-gray-900"
  >
    <span class="mr-8 text-2xl font-bold text-[#4a5568]">
      <slot name="title"></slot>
    </span>
    <div class="flex-grow overflow-y-auto py-5 text-[#4a5568]">
      <slot :params="params"></slot>
    </div>
    <div class="flex-shrink-0 flex justify-center items-center pt-4">
      <button class="badge-lg-emerald mr-4" @click="$emit('confirm', close)">確定</button>
      <button class="badge-lg-orange" @click="$emit('cancel', close)">取消</button>
    </div>
    <button
      class="absolute top-0 right-0 mt-2 mr-2 rounded focus:(ring-2 ring-[#4a5568])"
      @click="close"
    >
      <div class="i-mdi-close text-2em text-[#4a5568]"></div>
    </button>
  </VueFinalModal>
</template>

<style scoped></style>
