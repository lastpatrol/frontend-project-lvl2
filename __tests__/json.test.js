import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import parse from '../src/parse.js';
import genDiff from '../src/gendiff.js';
import json from '../src/formatters/json.js';
import expected from '../__fixtures__/expected-json.js';

const filePath = fileURLToPath(import.meta.url);
const dirPath = path.dirname(filePath);
const getFixturePath = (filename) => path.join(dirPath, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('json', () => {
  const data1 = readFile('file1.yml');
  const data2 = readFile('file2.yml');
  const obj1 = parse(data1, 'yml');
  const obj2 = parse(data2, 'yml');
  expect(json(genDiff(obj1, obj2))).toEqual(expected);
});
