<script setup lang="ts">
import { ref } from 'vue';
import { $vfm } from 'vue-final-modal';
import { useRaffleStore } from '@/composables/raffleStore';
import SettingsModal from './SettingsModal.vue';
import type { RaffleItemList } from '@/types';

// Raffle Settings
const store = useRaffleStore();
const settingsList = ref<RaffleItemList>(JSON.parse(JSON.stringify(store.raffleItems.value)));

// Modal Methods
const show = ref(true);
const confirm = () => {
  store.setRaffleItems(settingsList.value);
  $vfm.hide('settings-modal');
};
const cancel = () => {
  $vfm.hide('settings-modal');
};
const openModal = () => {
  settingsList.value = JSON.parse(JSON.stringify(store.raffleItems.value));
  $vfm.show('settings-modal');
};
</script>

<template>
  <SettingsModal v-model="show" @confirm="confirm" @cancel="cancel">
    <template v-slot:title>抽獎設定</template>
    <div grid md:grid-cols-3 gap-4>
      <label :for="`raffle-item--${item.id}`" v-for="(item, index) in settingsList" :key="index">
        欄位{{ index + 1 }}：
        <input
          :id="`raffle-item--${item.id}`"
          type="text"
          outline-none
          border
          p-1
          v-model="item.name"
        />
      </label>
    </div>
  </SettingsModal>
  <button
    @click="openModal"
    type="button"
    badge-lg-sky
    transition
    hover:translate-y--2px
    flex
    items-center
    mx-auto
  >
    <div text-sky i-ic-baseline-settings mr-1></div>
    抽獎設定
  </button>
</template>

<style scoped></style>
