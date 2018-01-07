import { expect }  from 'chai';
import lsMapWrap from '../../src/index';
import theoretically from 'jasmine-theories';


describe('ls-map-wrap', () => {
  describe('has', ()=> {
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
  describe('get/set', ()=> {
    it('should return undefined when the element is not in the map', () => {
      let value = lsMapWrap.get('non-existant-key');
      expect(value).to.equal(undefined);
    });
    let testCount = 0;
    theoretically.it('should return the proper element (%s)', [0, undefined, null, false, true, 'test', 
                                                          Date.now(), [1, 2, 3], Infinity, () => {},
                                                        {test: 'x'}, Promise.resolve(5)], (element) => {
      testCount++;
      let key = `test-${testCount}`;
      lsMapWrap.set(key, element);
      let value = lsMapWrap.get(key);
      expect(value).to.deep.equal(element);
    });
    it('should work with NaN', () => {
      let nanKey = 'nan-key';
      lsMapWrap.set(nanKey, NaN);
      expect(Number.isNaN(lsMapWrap.get(nanKey))).to.equal(true);
    });
  });
  describe('delete', ()=> {
    it('should not throw an error when nothing is passed', () => {
      expect(() => lsMapWrap.delete()).not.to.throw();
    });
    it('should not throw an error when value that isn\'t in the map is passed', () => {
      expect(() => lsMapWrap.delete('non-existant-key')).not.to.throw();
    });
    it('should remove an existing item', () => {
      let key = 'removingKey';
      let element = 'test';
      lsMapWrap.set(key, element);
      lsMapWrap.delete(key);
      expect(lsMapWrap.has(key)).to.equal(false);
    });
  });
  describe('clear', ()=> {
    it('should remove all items', () => {
      let keys = [1, 2, 3];
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