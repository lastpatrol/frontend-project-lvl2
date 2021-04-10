import _ from 'lodash';

const buildDiff = (obj1, obj2) => {
  const unitedKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));

  return unitedKeys.map(
    (key) => {
      if (!_.has(obj1, key) && _.isPlainObject(obj2[key])) {
        return {
          key,
          type: 'added',
          children: buildDiff(obj2[key], obj2[key]),
        };
      }

      if (!_.has(obj1, key) && !_.isPlainObject(obj2[key])) {
        return {
          key,
          type: 'added',
          value: obj2[key],
        };
      }

      if (!_.has(obj2, key) && _.isPlainObject(obj1[key])) {
        return {
          key,
          type: 'removed',
          children: buildDiff(obj1[key], obj1[key]),
        };
      }

      if (!_.has(obj2, key) && !_.isPlainObject(obj1[key])) {
        return {
          key,
          type: 'removed',
          value: obj1[key],
        };
      }

      const value1 = obj1[key];
      const value2 = obj2[key];

      if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
        return {
          key,
          type: 'unchanged',
          children: buildDiff(obj1[key], obj2[key]),
        };
      }

      if (_.isPlainObject(value1)) {
        return {
          key,
          type: 'toSimple',
          value: obj2[key],
          children: buildDiff(obj1[key], obj1[key]),
        };
      }

      if (_.isPlainObject(value2)) {
        return {
          key,
          type: 'toNested',
          value: obj1[key],
          children: buildDiff(obj2[key], obj2[key]),
        };
      }

      if (value1 !== value2) {
        return {
          key,
          type: 'toSimple',
          removedValue: obj1[key],
          addedValue: obj2[key],
        };
      }

      if (value1 === value2) {
        return {
          key,
          type: 'unchanged',
          value: obj1[key],
        };
      }

      throw new Error('Something went wrong in genDiff...');
    },
  );
};

export default buildDiff;
