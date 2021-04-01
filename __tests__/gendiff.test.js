import genDiff from '../src/gendiff.js';
import { obj1, obj2, diffObj } from '../__fixtures__/expected.js';

test('large', () => {
  expect(genDiff(obj1, obj2)).toEqual(diffObj);
});
