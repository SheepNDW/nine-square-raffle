import { ref } from 'vue';
import { createGlobalState } from '@/utils/createGlobalState';
import type { RaffleItemList } from '@/types';

export const useRaffleStore = createGlobalState(() => {
  const raffleItems = ref<RaffleItemList>([
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

  const setRaffleItems = (items: RaffleItemList) => {
    raffleItems.value = items;
  };

  return {
    raffleItems,
    setRaffleItems,
  };
});
