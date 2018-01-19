import isPromise from 'p-is-promise';
export default function promisePlugin() {
  
  return {
    set: function(super_fn, key, value){
      if(isPromise(value)){
        value.then((awaitedValue) => {
          super_fn(key, awaitedValue);
          super_fn(`${key}-isPromise`, true);
        });
      } else {
        super_fn(key, value);
      }
    },
    get: function(super_fn, key) {
      let isPromise = super_fn(`${key}-isPromise`);
      if(isPromise){
        const ls = window.localStorage;
        return Promise.resolve(JSON.parse(ls.getItem(key)));
      }
      return super_fn(key);
		}
  };
}
