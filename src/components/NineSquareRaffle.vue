<script setup lang="ts">
import { computed, ref } from 'vue';
import { useRaffleStore } from '@/composables/raffleStore';
import { getRandomNumber } from '@/utils/getRandom';

// 獎品列表
const store = useRaffleStore();
const raffleItemList = computed(() => store.raffleItems.value);

// 本輪中獎的獎項
const raffleResult = ref<null | string>(null);

// 抽獎紀錄
const totalResults = ref<string[]>([]);
const clearHistory = () => (totalResults.value = []);

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
    winingRaffle.value = getRandomNumber(0, 8);
  }

  // 決定圈數，隨機選擇 8-16 圈，當 winingRaffle > 4 時少一圈
  const num = getRandomNumber(8, 16);
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
    totalResults.value.push(raffleItemList.value[winingRaffle.value].name);
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
        class="w-[95px] h-[95px] p-2 border rounded flex items-center justify-center break-all"
        :class="{ selected: selectedItem === index }"
        v-for="(item, index) in raffleItemList"
        :key="index"
        @click="setBlackBoxRaffle(index)"
      >
        {{ item.name }}
      </li>
    </ul>

    <div mt-4>本次抽選結果：{{ raffleResult }}</div>
    <div mt-4>
      歷史紀錄：
      <span v-for="(result, i) in totalResults" :key="i">{{ result + ' ' }}</span>
    </div>

    <button
      @click="drawing"
      type="button"
      badge-lg-teal
      transition
      hover:translate-y--2px
      flex
      items-center
      mx-auto
      mt-4
    >
      <div i-mdi-dice mr-1></div>
      開始
    </button>
    <button
      @click="clearHistory"
      type="button"
      badge-lg-yellow
      transition
      hover:translate-y--2px
      flex
      items-center
      mx-auto
      mt-2
    >
      <div i-mdi-refresh mr-1></div>
      清除歷史
    </button>
  </div>
</template>

<style scoped>
.selected {
  @apply border border-teal bg-teal-200 rounded;
}
</style>
