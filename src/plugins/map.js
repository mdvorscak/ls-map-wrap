export default function mapPlugin() {
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
}
