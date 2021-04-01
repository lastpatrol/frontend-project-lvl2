import stylish from '../src/stylish.js';
import { diffStr, diffObj } from '../__fixtures__/expected.js';

test('large', () => {
  expect(stylish(diffObj)).toEqual(diffStr);
});
