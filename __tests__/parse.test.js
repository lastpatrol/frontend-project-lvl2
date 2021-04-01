import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import parse from '../src/parse.js';
import { obj1, obj2 } from '../__fixtures__/expected.js';

const filePath = fileURLToPath(import.meta.url);
const dirPath = path.dirname(filePath);
const getFixturePath = (filename) => path.join(dirPath, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test('json', () => {
  expect(parse(readFile('file1.json'), 'json')).toEqual(obj1);
  expect(parse(readFile('file2.json'), 'json')).toEqual(obj2);
});

test('yaml', () => {
  expect(parse(readFile('file1.yml'), 'yaml')).toEqual(obj1);
  expect(parse(readFile('file2.yml'), 'yml')).toEqual(obj2);
});
