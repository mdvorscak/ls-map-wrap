import isPromise from 'p-is-promise';
export default function promisePlugin() {
  const ls = window.localStorage;
  return {
    set: function(super_fn, key, value){
      if(isPromise(value)){
        value.then((awaitedValue) => {
          ls.setItem(key, awaitedValue);
          ls.setItem(`${key}-isPromise`, true);
        });
      } else {
        super_fn(key, value);
      }
    },
    get: function(super_fn, key) {
      let isPromise = super_fn(`${key}-isPromise`);
      if(isPromise){
        return Promise.resolve(ls.getItem(key));
      }
      return super_fn(key);
		}
  };
}
