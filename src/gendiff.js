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
          return [
            ...acc,
            { diff: 0, key, value: buildDiff(val1, val2) },
          ];
        }
        if (isObject(val1)) {
          return [
            ...acc,
            { diff: -1, key, value: buildDiff(val1, val1) },
            { diff: 1, key, value: val2 },
          ];
        }
        if (isObject(val2)) {
          return [
            ...acc,
            { diff: -1, key, value: val1 },
            { diff: 1, key, value: buildDiff(val2, val2) },
          ];
        }
        if (val1 === val2) {
          return [
            ...acc,
            { diff: 0, key, value: val1 },
          ];
        }

        return [
          ...acc,
          { diff: -1, key, value: val1 },
          { diff: 1, key, value: val2 },
        ];
      }

      if (_.has(obj1, key)) {
        const val = obj1[key];
        if (isObject(val)) {
          return [
            ...acc,
            { diff: -1, key, value: buildDiff(val, val) },
          ];
        }

        return [
          ...acc,
          { diff: -1, key, value: val },
        ];
      }

      if (_.has(obj2, key)) {
        const val = obj2[key];
        if (isObject(val)) {
          return [
            ...acc,
            { diff: 1, key, value: buildDiff(val, val) },
          ];
        }

        return [
          ...acc,
          { diff: 1, key, value: val },
        ];
      }

      throw new Error('Strange unknown case in genDiff...');
    },
    [],
  );

  return result;
};

export default buildDiff;
