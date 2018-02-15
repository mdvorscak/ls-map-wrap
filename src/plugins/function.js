export default function functionPlugin() {
  const ls = window.localStorage;
  return {
    set(superFn, key, value) {
      if (typeof value === 'function') {
        ls.setItem(key, `return ${value}`);
        ls.setItem(`${key}-isFn`, true);
      } else {
        superFn(key, value);
      }
    },
    get(superFn, key) {
      const isFunction = superFn(`${key}-isFn`);
      if (isFunction) {
        /* eslint-disable no-new-func */
        const wrapper = new Function(ls.getItem(key));
        return wrapper();
      }
      return superFn(key);
    }
  };
}
