/**
 * @template T
 * @param { Array<T> } items
 * @return { T | undefined }
 */
export const getRandomItem = (items) =>
  items[Math.floor(Math.random() * items.length)];

/**
 * @param { number } min
 * @param { number } max
 * @return  { number }
 */
export const getRandomInt = (min, max) =>
  min > max ? NaN : Math.floor(Math.random() * (max - min + 1) + min);
