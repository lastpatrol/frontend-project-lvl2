import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';
import parse from '../src/parse.js';

const filePath = fileURLToPath(import.meta.url);
const dirPath = path.dirname(filePath);
const getFixturePath = (filename) => path.join(dirPath, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff', () => {
  const obj1 = parse(readFile('file1.json'), 'json');
  const obj2 = parse(readFile('file2.json'), 'json');
  const expected12 = readFile('expected12.txt');
  const expected21 = readFile('expected21.txt');
  expect(genDiff(obj1, obj2)).toEqual(expected12);
  expect(genDiff(obj2, obj1)).toEqual(expected21);
});
