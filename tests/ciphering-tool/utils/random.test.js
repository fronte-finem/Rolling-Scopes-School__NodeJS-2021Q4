import {
  getRandomInt,
  getRandomItem,
} from '../../../ciphering-tool/utils/random.js';

const runner = (run) => {
  for (let i = 0; i < 1000; i += 1) {
    run();
  }
};

describe('Random item getter:', () => {
  it('should return "undefined" if passed empty array', () => {
    expect(getRandomItem([])).toBeUndefined();
  });

  it('should return some item from array', () => {
    const array = Array(1000).fill({});
    runner(() => {
      const item = getRandomItem(array);
      expect(array.includes(item)).toBe(true);
    });
  });
});

describe('Random integer from min to max bounds:', () => {
  it('should return return "NaN" if min > max', () => {
    runner(() => expect(getRandomInt(9, 0)).toBe(NaN));
  });

  it('should return min if min = max', () => {
    const min = 42;
    runner(() => expect(getRandomInt(min, min)).toBe(min));
  });

  it('should return x ∈ [min, max] if min < max', () => {
    const min = -42;
    const max = 0;
    runner(() => {
      const x = getRandomInt(min, max);
      expect(x >= min && x <= max).toBe(true);
    });
  });
});
