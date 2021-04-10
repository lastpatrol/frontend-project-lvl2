import { fileURLToPath } from 'url';
import { readFileSync } from 'fs';
import path from 'path';
import parse from '../src/parse.js';
import genDiff from '../src/gendiff.js';
import stylish from '../src/formatters/stylish.js';
import expectedStylish from '../__fixtures__/expected-stylish.js';
import plain from '../src/formatters/plain.js';
import expectedPlain from '../__fixtures__/expected-plain.js';
import json from '../src/formatters/json.js';
import expectedJson from '../__fixtures__/expected-json.js';

const filePath = fileURLToPath(import.meta.url);
const dirPath = path.dirname(filePath);
const getFixturePath = (filename) => path.join(dirPath, '..', '__fixtures__', filename);
const readFile = (filename) => readFileSync(getFixturePath(filename), 'utf-8');

test.each`
  filename1       | filename2        | formatter  | expected
  ${'file1.json'} | ${'file2.yml'}   | ${stylish} | ${expectedStylish}
  ${'file1.yml'}  | ${'file2.json'}  | ${plain}   | ${expectedPlain}
  ${'file1.json'} | ${'file2.json'}  | ${json}    | ${expectedJson}
`('$formatter.name', ({
  filename1, filename2, formatter, expected,
}) => {
  const data1 = readFile(filename1);
  const data2 = readFile(filename2);
  const type1 = path.extname(filename1).slice(1);
  const type2 = path.extname(filename2).slice(1);
  const obj1 = parse(data1, type1);
  const obj2 = parse(data2, type2);
  expect(formatter(genDiff(obj1, obj2))).toEqual(expected);
});
