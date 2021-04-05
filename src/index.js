import parse from './parse.js';
import genDiff from './gendiff.js';
import stylish from './formatters/stylish.js';
import lazy from './formatters/lazy.js';
import plain from './formatters/plain.js';
import json from './formatters/json.js';

const formatters = {
  stylish, lazy, plain, json,
};

export default (filepath1, filepath2, format) => {
  const obj1 = parse(filepath1);
  const obj2 = parse(filepath2);
  const diffObj = genDiff(obj1, obj2);
  console.log(format);
  console.log(formatters);
  console.log(diffObj);
  console.log(formatters[format](diffObj));
};
