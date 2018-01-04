import { assert } from 'chai';
import lsMapWrap from '../../src/index';
import theoretically from 'jasmine-theories';

describe('ls-map-wrap', () => {
  describe('has', ()=> {
    it('should return false when nothing is passed');
    it('should return false when the element is not in the map');
    it('should return true when the element is in the map');
  });
  describe('get/set', ()=> {
    it('should return undefined when the element is not in the map');
    theoretically.it('should return the proper element', [0, undefined, null, false, true, 'test', 
                                                          Date.now(), [1, 2, 3], Infinity, NaN, () => {},
                                                        {test: 'x'}, Promise.resolve(5)], (element) = {
      
    });
  });
  describe('delete', ()=> {
    it('should not throw an error when nothing is passed');
    it('should not throw an error when value that isn\'t in the map is passed');
    it('should remove an existing item');
  });
  describe('clear', ()=> {
    it('should remove all items');
  });
});