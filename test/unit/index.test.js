import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import theoretically from 'jasmine-theories';
import lsMapWrap from '../../src/index';

const expect = chai.expect;
chai.use(chaiAsPromised);

describe('ls-map-wrap', () => {
  describe('has', () => {
    it('should return false when nothing is passed', () => {
      expect(lsMapWrap.has()).to.equal(false);
    });
    it('should return false when the element is not in the map', () => {
      expect(lsMapWrap.has()).to.equal(false);
    });
    it('should return true when the element is in the map', () => {
      lsMapWrap.set('test', 'test');
      expect(lsMapWrap.has('test')).to.equal(true);
    });
  });
  describe('get/set', () => {
    it('should return undefined when the element is not in the map', () => {
      const value = lsMapWrap.get('non-existant-key');
      expect(value).to.equal(undefined);
    });
    let testCount = 0;
    theoretically.it('should return the proper element (%s)', [0, undefined, null, false, true, 'test',
      Date.now(), [1, 2, 3], Infinity, {test: 'x'}], element => {
        testCount++;
        const key = `test-${testCount}`;
        lsMapWrap.set(key, element);
        const value = lsMapWrap.get(key);
        expect(value).to.deep.equal(element);
      });
    it('should work with NaN', () => {
      const nanKey = 'nan-key';
      lsMapWrap.set(nanKey, NaN);
      expect(Number.isNaN(lsMapWrap.get(nanKey))).to.equal(true);
    });
    it('should work with a function', () => {
      const fnKey = 'fn-key';
      const fn = () => 'test value';
      lsMapWrap.set(fnKey, fn);
      const retrievedFn = lsMapWrap.get(fnKey);
      expect(retrievedFn).to.be.a('function');
      expect(retrievedFn()).to.equal('test value');
    });
    it('should work with a Promise', done => {
      const promiseKey = 'promise-key';
      const p = Promise.resolve({x: 'internalObjectValue'});
      lsMapWrap.set(promiseKey, p);
      setTimeout(() => {
        const retrievedPromise = lsMapWrap.get(promiseKey);
        expect(retrievedPromise).to.eventually.deep.equal({x: 'internalObjectValue'}).notify(done);
      }, 0);
    });
  });
  describe('delete', () => {
    it('should not throw an error when nothing is passed', () => {
      expect(() => lsMapWrap.delete()).not.to.throw();
    });
    it('should not throw an error when value that isn\'t in the map is passed', () => {
      expect(() => lsMapWrap.delete('non-existant-key')).not.to.throw();
    });
    it('should remove an existing item', () => {
      const key = 'removingKey';
      const element = 'test';
      lsMapWrap.set(key, element);
      lsMapWrap.delete(key);
      expect(lsMapWrap.has(key)).to.equal(false);
    });
  });
  describe('clear', () => {
    it('should remove all items', () => {
      const keys = [1, 2, 3];
      keys.forEach(element => {
        lsMapWrap.set(element, element);
      });
      lsMapWrap.clear();
      keys.forEach(element => {
        expect(lsMapWrap.has(element)).to.equal(false);
      });
    });
  });
});
