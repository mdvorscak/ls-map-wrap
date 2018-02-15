export default function mapPlugin() {
  return {
    has(f, key) {
      return this.get(key) !== undefined;
    },
    delete(f, key) {
      return this.remove(key);
    },
    clear() {
      this.clearAll();
    }
  };
}
