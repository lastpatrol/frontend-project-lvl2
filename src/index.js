import { readFileSync } from 'fs';
import path from 'path';
import parse from './parse.js';
import stylish from './formatters/stylish.js';
import lazy from './formatters/lazy.js';
import plain from './formatters/plain.js';
import genDiff from './gendiff.js';

const formatters = { stylish, lazy, plain };

export default (filepath1, filepath2, format) => {
  const cwd = process.cwd();
  const fullPath1 = path.resolve(cwd, filepath1);
  const fullPath2 = path.resolve(cwd, filepath2);
  const type1 = path.extname(filepath1).slice(1);
  const type2 = path.extname(filepath2).slice(1);
  const obj1 = parse(readFileSync(fullPath1, 'utf-8'), type1);
  const obj2 = parse(readFileSync(fullPath2, 'utf-8'), type2);
  const diffObj = genDiff(obj1, obj2);
  console.log(formatters[format](diffObj));
};
