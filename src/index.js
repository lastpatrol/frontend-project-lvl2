import _ from 'lodash';
import { readFileSync } from 'fs';

const genDiff = (path1, path2) => {
  const json1 = readFileSync(path1, 'utf8');
  const json2 = readFileSync(path2, 'utf8');
  const obj1 = JSON.parse(json1);
  const obj2 = JSON.parse(json2);
  const allKeysSorted = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  const resultArr = allKeysSorted.reduce(
    (acc, key) => {
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
    },
    [],
  );

  return `{\n${resultArr.join('\n')}\n}`;
};

export default genDiff;
