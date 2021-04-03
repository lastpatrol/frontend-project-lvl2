import plain from '../src/formatters/plain.js';
import { diffObj } from '../__fixtures__/expected.js';
import expected from '../__fixtures__/expected-plain.js';

test('large', () => {
  expect(plain(diffObj)).toEqual(expected);
});
