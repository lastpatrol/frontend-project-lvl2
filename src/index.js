import _ from 'lodash';
import { readFileSync } from 'fs';
import path from 'path';

const genDiff = (json1, json2) => {
  const obj1 = JSON.parse(json1);
  const obj2 = JSON.parse(json2);
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

const printDiffByPath = (filepath1, filepath2) => {
  const cwd = process.cwd();
  const fullPath1 = path.resolve(cwd, filepath1);
  const fullPath2 = path.resolve(cwd, filepath2);
  const json1 = readFileSync(fullPath1, 'utf-8');
  const json2 = readFileSync(fullPath2, 'utf-8');
  console.log(genDiff(json1, json2));
};

export { genDiff as default, printDiffByPath };
