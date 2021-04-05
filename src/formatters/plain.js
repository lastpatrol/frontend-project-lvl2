import _ from 'lodash';

const isComplex = (value) => Array.isArray(value);

const valueToStr = (value) => {
  if (isComplex(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return String(value);
};

const getFromAndToValuesByKey = (entries, neededKey) => entries
  .filter(({ key }) => key === neededKey)
  .reduce(
    (acc, { diff, value }) => (diff > 0 ? { ...acc, to: value } : { ...acc, from: value }),
    {},
  );

const getDiffByKey = (entries, neededKey) => {
  const [entry] = entries.filter(({ key }) => key === neededKey);
  return entry.diff;
};

const getValueByKey = (entries, neededKey) => {
  const [entry] = entries.filter(({ key }) => key === neededKey);
  return entry.value;
};

const plain = (diffObj) => {
  const iter = (entries, path) => {
    const keys = entries.map(({ key }) => key);
    const uniqKeys = _.uniq(keys);
    const updatedKeys = keys.filter((key, i, arr) => _.lastIndexOf(arr, key) !== i);

    return uniqKeys.reduce(
      (acc, key) => {
        const fullPath = path.length === 0 ? `${key}` : `${path}.${key}`;

        if (updatedKeys.includes(key)) {
          const values = getFromAndToValuesByKey(entries, key);
          const from = valueToStr(values.from);
          const to = valueToStr(values.to);
          return [...acc, `Property '${fullPath}' was updated. From ${from} to ${to}`];
        }

        if (getDiffByKey(entries, key) > 0) {
          const value = getValueByKey(entries, key);
          return [...acc, `Property '${fullPath}' was added with value: ${valueToStr(value)}`];
        }

        if (getDiffByKey(entries, key) < 0) {
          return [...acc, `Property '${fullPath}' was removed`];
        }

        const value = getValueByKey(entries, key);
        if (isComplex(value)) {
          return [...acc, ...iter(value, fullPath)];
        }

        return acc;
      },
      [],
    );
  };

  return iter(diffObj, []).join('\n');
};

export default plain;
