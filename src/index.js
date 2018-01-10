import store from 'store';
import promisePlugin from './plugins/promise';
import nanInfinityPlugin from './plugins/nanInfinity';
import functionPlugin from './plugins/function';
import mapPlugin from './plugins/map';

store.addPlugin(promisePlugin);
store.addPlugin(nanInfinityPlugin);
store.addPlugin(functionPlugin);
store.addPlugin(mapPlugin);

export default store;
