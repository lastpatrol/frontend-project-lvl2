import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import parse from '../src/parse.js';
import genDiff from '../src/gendiff.js';
import plain from '../src/formatters/plain.js';
import expected from '../__fixtures__/expected-plain.js';

const filePath = fileURLToPath(import.meta.url);
const dirPath = path.dirname(filePath);
const getFixturePath = (filename) => path.join(dirPath, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('plain', () => {
  const data1 = readFile('file1.yml');
  const data2 = readFile('file2.json');
  const obj1 = parse(data1, 'yml');
  const obj2 = parse(data2, 'json');
  expect(plain(genDiff(obj1, obj2))).toEqual(expected);
});
