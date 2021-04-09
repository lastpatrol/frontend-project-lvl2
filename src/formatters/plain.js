import _ from 'lodash';

const getDiffType = (obj) => {
  if ((!_.has(obj, 'children') && obj.type === 'toSimple')
    || (!_.has(obj, 'value') && obj.type === 'toNested')) {
    return 'added';
  }
  if (obj.type === 'removed') {
    return 'removed';
  }
  if (obj.type === 'changedSimple' || (_.has(obj, 'value') && _.has(obj, 'children'))) {
    return 'updated';
  }
  if (obj.type === 'unchanged' && _.has(obj, 'children')) {
    return 'unchangedWithChildren';
  }
  return 'unchangedWithoutChildren';
};

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
  if (obj.type === 'removed') {
    return _.has(obj, 'value') ? dataToStr(obj.value) : dataToStr(obj.children);
  }
  if (obj.type === 'toNested' && _.has(obj, 'value')) {
    return dataToStr(obj.value);
  }
  if (obj.type === 'toSimple' && _.has(obj, 'children')) {
    return dataToStr(obj.children);
  }
  if (_.has(obj, 'removedValue')) {
    return dataToStr(obj.removedValue);
  }
  throw new Error(`Cannot find removed in:\n${JSON.stringify(obj)}`);
};

const getAddedAsStr = (obj) => {
  if (obj.type === 'toNested') {
    return dataToStr(obj.children);
  }
  if (obj.type === 'toSimple') {
    return dataToStr(obj.value);
  }
  if (_.has(obj, 'addedValue')) {
    return dataToStr(obj.addedValue);
  }
  throw new Error(`Cannot find added in:\n${JSON.stringify(obj)}`);
};

const plain = (diffObj) => {
  const iter = (entries, path) => entries.reduce(
    (acc, obj) => {
      const { key } = obj;
      const fullPath = path.length === 0 ? `${key}` : `${path}.${key}`;
      const diffType = getDiffType(obj);

      switch (diffType) {
        case 'added':
          return [...acc, `Property '${fullPath}' was added with value: ${getAddedAsStr(obj)}`];
        case 'removed':
          return [...acc, `Property '${fullPath}' was removed`];
        case 'updated':
          return [...acc, `Property '${fullPath}' was updated. From ${getRemovedAsStr(obj)} to ${getAddedAsStr(obj)}`];
        case 'unchangedWithChildren':
          return [...acc, ...iter(obj.children, fullPath)];
        default:
          return acc;
      }
    },
    [],
  );

  return iter(diffObj, []).join('\n');
};

export default plain;
