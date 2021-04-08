import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import parse from '../src/parse.js';
import genDiff from '../src/gendiff.js';
import expected from '../__fixtures__/expected-gendiff.js';

const filePath = fileURLToPath(import.meta.url);
const dirPath = path.dirname(filePath);
const getFixturePath = (filename) => path.join(dirPath, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('genDiff', () => {
  const obj1 = parse(readFile('file1.yml'), 'yml');
  const obj2 = parse(readFile('file2.json'), 'json');

  expect(genDiff(obj1, obj2)).toEqual(expected);
});
