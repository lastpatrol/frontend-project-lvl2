import { readFileSync } from 'fs';
import path from 'path';
import parse from './parse.js';
import genDiff from './gendiff.js';
import getFormatter from './formatters/get-formatter.js';

const readFile = (filepath) => {
  const cwd = process.cwd();
  const fullPath = path.resolve(cwd, filepath);
  return readFileSync(fullPath, 'utf-8');
};

export default (filepath1, filepath2, format = 'stylish') => {
  const data1 = readFile(filepath1);
  const data2 = readFile(filepath2);
  const type1 = path.extname(filepath1).slice(1);
  const type2 = path.extname(filepath2).slice(1);
  const obj1 = parse(data1, type1);
  const obj2 = parse(data2, type2);
  const diffObj = genDiff(obj1, obj2);
  return getFormatter(format)(diffObj);
};
