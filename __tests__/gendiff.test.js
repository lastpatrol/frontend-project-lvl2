import { fileURLToPath } from 'url';
import path from 'path';
import parse from '../src/parse.js';
import genDiff from '../src/gendiff.js';
import diffObj from '../__fixtures__/expected-diff.js';

const filePath = fileURLToPath(import.meta.url);
const dirPath = path.dirname(filePath);
const getFixturePath = (filename) => path.join(dirPath, '..', '__fixtures__', filename);

test('one', () => {
  const obj1 = parse(getFixturePath('file1.json'));
  const obj2 = parse(getFixturePath('file2.yml'));

  expect(genDiff(obj1, obj2)).toEqual(diffObj);
});

test('two', () => {
  const obj1 = parse(getFixturePath('file1.yml'));
  const obj2 = parse(getFixturePath('file2.json'));

  expect(genDiff(obj1, obj2)).toEqual(diffObj);
});
