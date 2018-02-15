import isPromise from 'p-is-promise';

export default function promisePlugin() {
  return {
    set(superFn, key, value) {
      if (isPromise(value)) {
        value.then(awaitedValue => {
          superFn(key, awaitedValue);
          superFn(`${key}-isPromise`, true);
        });
      } else {
        superFn(key, value);
      }
    },
    get(superFn, key) {
      const isPromise = superFn(`${key}-isPromise`);
      if (isPromise) {
        const ls = window.localStorage;
        return Promise.resolve(JSON.parse(ls.getItem(key)));
      }
      return superFn(key);
    }
  };
}
