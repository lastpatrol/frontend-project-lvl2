import { fileURLToPath } from 'url';
import path from 'path';
import parse from '../src/parse.js';
import genDiff from '../src/gendiff.js';
import json from '../src/formatters/json.js';
import expected from '../__fixtures__/expected-json.js';

const filePath = fileURLToPath(import.meta.url);
const dirPath = path.dirname(filePath);
const getFixturePath = (filename) => path.join(dirPath, '..', '__fixtures__', filename);

test('json', () => {
  const obj1 = parse(getFixturePath('file1.json'));
  const obj2 = parse(getFixturePath('file2.yml'));
  expect(json(genDiff(obj1, obj2))).toEqual(expected);
});
