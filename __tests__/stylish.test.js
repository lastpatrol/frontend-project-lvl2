import stylish from '../src/formatters/stylish.js';
import { diffObj } from '../__fixtures__/expected.js';
import expected from '../__fixtures__/expected-stylish.js';

test('large', () => {
  expect(stylish(diffObj)).toEqual(expected);
});
