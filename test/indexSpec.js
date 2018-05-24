import { expect } from 'chai';
import {add} from '../src/index';

describe('Test Index', () => {

  describe('index.add()', () => {

    it('should return 4 when add(2, 2)', () => {
      expect(4).to.be.equal(add(2,2));
    });

  });

});
