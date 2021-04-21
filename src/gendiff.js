import _ from 'lodash';

const buildDiff = (obj1, obj2) => {
  const unitedKeys = _.sortBy(_.union(Object.keys(obj1), Object.keys(obj2)));
  return unitedKeys.map(
    (key) => {
      if (!_.has(obj1, key) && _.has(obj2, key)) {
        return { key, type: 'added', value: obj2[key] };
      }
      if (_.has(obj1, key) && !_.has(obj2, key)) {
        return { key, type: 'removed', value: obj1[key] };
      }
      if (_.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key])) {
        return { key, type: 'nested', children: buildDiff(obj1[key], obj2[key]) };
      }
      if (obj1[key] === obj2[key]) {
        return { key, type: 'unchanged', value: obj1[key] };
      }
      return {
        key, type: 'changed', oldValue: obj1[key], newValue: obj2[key],
      };
    },
  );
};

export default buildDiff;
