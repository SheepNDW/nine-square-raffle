<script setup lang="ts">
import { computed, ref } from 'vue';
import type { RaffleItemList } from '@/types';

// 獎品列表
const raffleItemList = ref<RaffleItemList>([
  { name: 'A', id: 1 },
  { name: 'B', id: 2 },
  { name: 'C', id: 3 },
  { name: 'D', id: 4 },
  { name: 'E', id: 5 },
  { name: 'F', id: 6 },
  { name: 'G', id: 7 },
  { name: 'H', id: 8 },
  { name: 'I', id: 9 },
]);

// 本輪中獎的獎項
const raffleResult = ref<null | string>(null);

// 中獎的索引 & 強迫中獎方法
const winingRaffle = ref<null | number>(null);
const setBlackBoxRaffle = (index: number) => (winingRaffle.value = index);

// 目前選到的獎項索引
const selectedItem = ref(0);

// 經過圈數
const turnsNumber = ref(0);
// 中獎需要圈數
const targetTurnsNumber = ref(0);
// 剩餘幾個中獎 (剩餘圈數 * 9 + 中獎的索引)
const restNum = computed(
  () =>
    (targetTurnsNumber.value - turnsNumber.value) * 9 +
    (winingRaffle.value as number) -
    selectedItem.value
);

// 初始轉動速度
const speed = ref(100);
let speedTimer: null | ReturnType<typeof setTimeout> = null;

const init = () => {
  selectedItem.value = 1;
  turnsNumber.value = 0;
  targetTurnsNumber.value = 0;
  speed.value = 100;
  raffleResult.value = null;
};

// 開始抽獎
const drawing = () => {
  if (speedTimer) return;
  init();

  if (!winingRaffle.value) {
    // 如果沒有黑箱，則隨機取得一個 0~8 的數字當作獎品列表的索引值
    winingRaffle.value = Math.round(Math.random() * 8);
  }

  // 決定圈數，隨機選擇 10-20 圈，當 winingRaffle > 4 時少一圈
  const num = Math.round(Math.random() * 10) + 10;
  targetTurnsNumber.value = winingRaffle.value > 4 ? num - 1 : num;

  handleRaffle();
};

// 抽獎過程
const handleRaffle = () => {
  // 每轉一圈
  if (selectedItem.value === 8) {
    turnsNumber.value++;
    selectedItem.value = 0;
  } else {
    selectedItem.value++;
  }

  speed.value = speedHandler();

  // 判斷轉動圈數是否已經等於總圈數以及轉到中獎位置上
  if (targetTurnsNumber.value === turnsNumber.value && selectedItem.value === winingRaffle.value) {
    raffleResult.value = raffleItemList.value[winingRaffle.value].name;
    clearTimeout(speedTimer as ReturnType<typeof setTimeout>);
    speedTimer = null;
    winingRaffle.value = null;
  } else {
    speedTimer = setTimeout(handleRaffle, speed.value);
  }
};

const speedHandler = () => {
  const total = targetTurnsNumber.value * 9 + (winingRaffle.value as number);

  // 剩下最後 9 個時減速到 300
  if (restNum.value <= 9) return 300;
  // 前 1/3 加速
  if (restNum.value >= (total * 2) / 3) return speed.value <= 50 ? 50 : speed.value - 2;
  // 後 1/3 減速
  if (restNum.value <= total / 3) return speed.value + 1;

  return speed.value;
};
</script>

<template>
  <div>
    <ul class="w-[300px] h-[300px] flex flex-wrap justify-around items-center">
      <li
        class="w-[95px] h-[95px] border rounded"
        :class="{ selected: selectedItem === index }"
        v-for="(item, index) in raffleItemList"
        :key="index"
        @click="setBlackBoxRaffle(index)"
      >
        {{ item.name }}
      </li>
    </ul>

    <div mt-4>抽選結果：{{ raffleResult }}</div>

    <button
      @click="drawing"
      type="button"
      badge-lg-teal
      transition
      hover:translate-y--2px
      block
      mx-auto
      mt-4
    >
      開始
    </button>
  </div>
</template>

<style scoped>
.selected {
  @apply border border-teal bg-teal-200 rounded;
}
</style>
