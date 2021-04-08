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
            addedData: {
              type: 'nested',
              children: buildDiff(obj2[key], obj2[key]),
            },
          };
        case 'void => simple':
          return {
            key,
            addedData: {
              type: 'simple',
              value: obj2[key],
            },
          };
        case 'nested => void':
          return {
            key,
            removedData: {
              type: 'nested',
              children: buildDiff(obj1[key], obj1[key]),
            },
          };
        case 'simple => void':
          return {
            key,
            removedData: {
              type: 'simple',
              value: obj1[key],
            },
          };
        case 'nested => nested':
          return {
            key,
            data: {
              type: 'nested',
              children: buildDiff(obj1[key], obj2[key]),
            },
          };
        case 'nested => simple':
          return {
            key,
            removedData: {
              type: 'nested',
              children: buildDiff(obj1[key], obj1[key]),
            },
            addedData: {
              type: 'simple',
              value: obj2[key],
            },
          };
        case 'simple => nested':
          return {
            key,
            removedData: {
              type: 'simple',
              value: obj1[key],
            },
            addedData: {
              type: 'nested',
              children: buildDiff(obj2[key], obj2[key]),
            },
          };
        case 'old simple => new simple':
          return {
            key,
            removedData: {
              type: 'simple',
              value: obj1[key],
            },
            addedData: {
              type: 'simple',
              value: obj2[key],
            },
          };
        case 'unchanged simple':
          return {
            key,
            data: {
              type: 'simple',
              value: obj1[key],
            },
          };
        default:
          throw new Error('Something went wrong in genDiff...');
      }
    },
  );
};

export default buildDiff;
