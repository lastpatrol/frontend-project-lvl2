import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';
import parse from './parse.js';

const genDiff = (obj1, obj2) => {
  const allKeysSorted = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  const resultArr = allKeysSorted.reduce((acc, key) => {
    const value1 = obj1[key];
    const value2 = obj2[key];

    if (value1 === value2) {
      acc.push(`    ${key}: ${value1}`);
    } else if (value2 === undefined) {
      acc.push(`  - ${key}: ${value1}`);
    } else if (value1 === undefined) {
      acc.push(`  + ${key}: ${value2}`);
    } else {
      acc.push(`  - ${key}: ${value1}`);
      acc.push(`  + ${key}: ${value2}`);
    }

    return acc;
  }, []);

  return `{\n${resultArr.join('\n')}\n}`;
};

const printDiff = (filepath1, filepath2) => {
  const cwd = process.cwd();
  const fullPath1 = path.resolve(cwd, filepath1);
  const fullPath2 = path.resolve(cwd, filepath2);
  const type1 = path.extname(filepath1).slice(1);
  const type2 = path.extname(filepath2).slice(1);
  const obj1 = parse(readFileSync(fullPath1, 'utf-8'), type1);
  const obj2 = parse(readFileSync(fullPath2, 'utf-8'), type2);
  console.log(genDiff(obj1, obj2));
};

export { genDiff as default, printDiff };
