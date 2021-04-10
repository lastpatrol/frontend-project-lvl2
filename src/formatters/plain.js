import _ from 'lodash';

const dataToStr = (data) => {
  if (Array.isArray(data)) {
    return '[complex value]';
  }
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  return String(data);
};

const getRemovedAsStr = (obj) => {
  switch (obj.type) {
    case 'removed':
      return _.has(obj, 'value') ? dataToStr(obj.value) : dataToStr(obj.children);
    case 'toSimple':
      return _.has(obj, 'children') ? dataToStr(obj.children) : dataToStr(obj.removedValue);
    case 'toNested':
      return dataToStr(obj.value);
    default:
      throw new Error(`Cannot find removed in:\n${JSON.stringify(obj)}`);
  }
};

const getAddedAsStr = (obj) => {
  switch (obj.type) {
    case 'added':
      return _.has(obj, 'value') ? dataToStr(obj.value) : dataToStr(obj.children);
    case 'toSimple':
      return _.has(obj, 'value') ? dataToStr(obj.value) : dataToStr(obj.addedValue);
    case 'toNested':
      return dataToStr(obj.children);
    default:
      throw new Error(`Cannot find added in:\n${JSON.stringify(obj)}`);
  }
};

const plain = (diffObj) => {
  const iter = (entries, path) => entries.reduce(
    (acc, obj) => {
      const { key, type } = obj;
      const fullPath = path.length === 0 ? `${key}` : `${path}.${key}`;

      switch (type) {
        case 'added':
          return [...acc, `Property '${fullPath}' was added with value: ${getAddedAsStr(obj)}`];
        case 'removed':
          return [...acc, `Property '${fullPath}' was removed`];
        case 'toSimple':
        case 'toNested':
          return [...acc, `Property '${fullPath}' was updated. From ${getRemovedAsStr(obj)} to ${getAddedAsStr(obj)}`];
        case 'unchanged':
          return (_.has(obj, 'children'))
            ? [...acc, ...iter(obj.children, fullPath)]
            : acc;
        default:
          throw new Error(`Unknown type! Type: '${type}', key '${key}'`);
      }
    },
    [],
  );

  return iter(diffObj, []).join('\n');
};

export default plain;
