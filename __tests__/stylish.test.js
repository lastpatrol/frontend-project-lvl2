import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import parse from '../src/parse.js';
import genDiff from '../src/gendiff.js';
import stylish from '../src/formatters/stylish.js';
import expected from '../__fixtures__/expected-stylish.js';

const filePath = fileURLToPath(import.meta.url);
const dirPath = path.dirname(filePath);
const getFixturePath = (filename) => path.join(dirPath, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('json', () => {
  const data1 = readFile('file1.json');
  const data2 = readFile('file2.yml');
  const obj1 = parse(data1, 'json');
  const obj2 = parse(data2, 'yml');
  expect(stylish(genDiff(obj1, obj2))).toEqual(expected);
});
