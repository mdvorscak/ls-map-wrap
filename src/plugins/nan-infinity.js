export default function nanInfinityPlugin() {
  const specialValues = {
    NaN,
    Infinity
  };
  const ls = window.localStorage;
  return {
    set(superFn, key, value) {
      const specialValue = specialValues[value];
      if (specialValue === undefined) {
        superFn(key, value);
      } else {
        ls.setItem(key, value);
      }
    },
    get(superFn, key) {
      const value = ls.getItem(key);
      const specialValue = specialValues[value];
      if (specialValue !== undefined) {
        return specialValue;
      }
      return superFn(key);
    }
  };
}
