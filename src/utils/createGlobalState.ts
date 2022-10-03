import { effectScope } from 'vue';

type CreateGlobalStateReturn<T> = () => T;

/**
 * 讓狀態存在於全域作用域讓多個 Vue 實例複用
 * @reference https://vueuse.org/createGlobalState
 * @param stateFactory 建立狀態的工廠函式
 */
export function createGlobalState<T>(stateFactory: () => T): CreateGlobalStateReturn<T> {
  let initialized = false;
  let state: T;
  const scope = effectScope(true);

  return () => {
    if (!initialized) {
      state = scope.run(stateFactory)!;
      initialized = true;
    }
    return state;
  };
}
