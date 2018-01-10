export default function nanInfinityPlugin() {
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
}
