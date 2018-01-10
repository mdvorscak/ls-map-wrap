export default function functionPlugin() {
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
}
