/**
 * 取得一個指定範圍內 (min, max) 的隨機整數
 * @param min - 最小值
 * @param max - 最大值
 */
export function getRandomNumber(min: number, max: number): number {
  return ~~(Math.random() * (max - min + 1)) + min;
}
