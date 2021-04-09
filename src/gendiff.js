import _ from 'lodash';

const isObject = (el) => {
  if (el === null || el === undefined) {
    return false;
  }
  return el.constructor === Object;
};

const compareByKey = (obj1, obj2, key) => {
  if (!_.has(obj1, key)) {
    if (isObject(obj2[key])) {
      return 'void => nested';
    }
    return 'void => simple';
  }
  if (!_.has(obj2, key)) {
    if (isObject(obj1[key])) {
      return 'nested => void';
    }
    return 'simple => void';
  }

  const value1 = obj1[key];
  const value2 = obj2[key];
  if (isObject(value1) && isObject(value2)) {
    return 'nested => nested';
  }
  if (isObject(value1)) {
    return 'nested => simple';
  }
  if (isObject(value2)) {
    return 'simple => nested';
  }
  if (value1 !== value2) {
    return 'old simple => new simple';
  }

  return 'unchanged simple';
};

const buildDiff = (obj1, obj2) => {
  const unitedKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  return unitedKeys.map(
    (key) => {
      const comparisonResult = compareByKey(obj1, obj2, key);
      switch (comparisonResult) {
        case 'void => nested':
          return {
            key,
            type: 'toNested',
            children: buildDiff(obj2[key], obj2[key]),
          };
        case 'void => simple':
          return {
            key,
            type: 'toSimple',
            value: obj2[key],
          };
        case 'nested => void':
          return {
            key,
            type: 'removed',
            children: buildDiff(obj1[key], obj1[key]),
          };
        case 'simple => void':
          return {
            key,
            type: 'removed',
            value: obj1[key],
          };
        case 'nested => nested':
          return {
            key,
            type: 'unchanged',
            children: buildDiff(obj1[key], obj2[key]),
          };
        case 'nested => simple':
          return {
            key,
            type: 'toSimple',
            value: obj2[key],
            children: buildDiff(obj1[key], obj1[key]),
          };
        case 'simple => nested':
          return {
            key,
            type: 'toNested',
            value: obj1[key],
            children: buildDiff(obj2[key], obj2[key]),
          };
        case 'old simple => new simple':
          return {
            key,
            type: 'changedSimple',
            removedValue: obj1[key],
            addedValue: obj2[key],
          };
        case 'unchanged simple':
          return {
            key,
            type: 'unchanged',
            value: obj1[key],
          };
        default:
          throw new Error('Something went wrong in genDiff...');
      }
    },
  );
};

export default buildDiff;
