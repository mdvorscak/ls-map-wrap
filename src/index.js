import isPromise from 'p-is-promise';
import store from 'store';

function mapPlugin() {
  return {
    has: function(f, key){
      return this.get(key) !== undefined;
    },
    delete: function(f, key){
      return this.remove(key);
    },
    clear: function(){
      this.clearAll();
    }
  };
};
function nanInfinityPlugin() {
  const specialValues = {
    'NaN' : NaN,
    'Infinity' : Infinity
  };
  const ls = window.localStorage;
  return {
    set: function(super_fn, key, value){
      let specialValue = specialValues[value];
      if(specialValue !== undefined){
        ls.setItem(key, value);
      } else {
        super_fn(key, value);
      }
    },
    get: function(super_fn, key) {
      let value = ls.getItem(key);
      let specialValue = specialValues[value];
      if(specialValue !== undefined){
        return specialValue;
      }
      return super_fn(key);
		}
  };
};

function functionPlugin() {
  const ls = window.localStorage;
  return {
    set: function(super_fn, key, value){
      if(typeof value === 'function'){
        ls.setItem(key, `return ${value}`);
        ls.setItem(`${key}-isFn`, true);
      } else {
        super_fn(key, value);
      }
    },
    get: function(super_fn, key) {
      let isFunction = super_fn(`${key}-isFn`);
      if(isFunction){
        var wrapper = new Function(ls.getItem(key));
        return wrapper();
      }
      return super_fn(key);
		}
  };
};

function promisePlugin() {
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
};

store.addPlugin(promisePlugin);
store.addPlugin(nanInfinityPlugin);
store.addPlugin(functionPlugin);
store.addPlugin(mapPlugin);

export default store;
