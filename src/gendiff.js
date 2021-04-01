import _ from 'lodash';

const isObject = (el) => {
  if (el === null || el === undefined) {
    return false;
  }
  return el.constructor === Object;
};

const buildDiff = (obj1, obj2) => {
  const keys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  const result = keys.reduce(
    (acc, key) => {
      if (_.has(obj1, key) && _.has(obj2, key)) {
        const val1 = obj1[key];
        const val2 = obj2[key];
        if (isObject(val1) && isObject(val2)) {
          acc.push({
            diff: 0,
            key,
            value: buildDiff(val1, val2),
          });
          return acc;
        }
        if (isObject(val1)) {
          acc.push({
            diff: -1,
            key,
            value: buildDiff(val1, val1),
          });
          acc.push({
            diff: 1,
            key,
            value: val2,
          });
          return acc;
        }
        if (isObject(val2)) {
          acc.push({
            diff: -1,
            key,
            value: val1,
          });
          acc.push({
            diff: 1,
            key,
            value: buildDiff(val2, val2),
          });
          return acc;
        }
        if (val1 === val2) {
          acc.push({
            diff: 0,
            key,
            value: val1,
          });
          return acc;
        }

        acc.push({
          diff: -1,
          key,
          value: val1,
        });
        acc.push({
          diff: 1,
          key,
          value: val2,
        });
        return acc;
      }

      if (_.has(obj1, key)) {
        const val = obj1[key];
        if (isObject(val)) {
          acc.push({
            diff: -1,
            key,
            value: buildDiff(val, val),
          });
          return acc;
        }

        acc.push({
          diff: -1,
          key,
          value: val,
        });
        return acc;
      }

      if (_.has(obj2, key)) {
        const val = obj2[key];
        if (isObject(val)) {
          acc.push({
            diff: 1,
            key,
            value: buildDiff(val, val),
          });
          return acc;
        }

        acc.push({
          diff: 1,
          key,
          value: val,
        });
        return acc;
      }

      throw new Error('Strange unknown case in genDiff...');
    },
    [],
  );

  return result;
};

export default buildDiff;
