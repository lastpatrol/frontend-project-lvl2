import json from '../src/formatters/json.js';
import { diffObj } from '../__fixtures__/expected.js';
import expected from '../__fixtures__/expected-json.js';

test('json', () => {
  expect(json(diffObj)).toEqual(expected);
});
