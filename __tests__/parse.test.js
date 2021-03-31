import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import path from 'path';
import parse from '../src/parse.js';

const filePath = fileURLToPath(import.meta.url);
const dirPath = path.dirname(filePath);
const getFixturePath = (filename) => path.join(dirPath, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

const obj1 = {
  host: 'hexlet.io',
  timeout: 50,
  proxy: '123.234.53.22',
  follow: false,
};

const obj2 = {
  timeout: 20,
  verbose: true,
  host: 'hexlet.io',
};

test('json', () => {
  expect(parse(readFile('file1.json'), 'json')).toEqual(obj1);
  expect(parse(readFile('file2.json'), 'json')).toEqual(obj2);
});

test('yaml', () => {
  expect(parse(readFile('file1.yml'), 'yaml')).toEqual(obj1);
  expect(parse(readFile('file2.yml'), 'yml')).toEqual(obj2);
});
