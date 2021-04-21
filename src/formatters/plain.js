import _ from 'lodash';

const dataToStr = (data) => {
  if (Array.isArray(data) || _.isPlainObject(data)) {
    return '[complex value]';
  }
  if (typeof data === 'string') {
    return `'${data}'`;
  }
  return String(data);
};

const plain = (diffObj) => {
  const iter = (nodes, path) => nodes.reduce(
    (acc, node) => {
      const { key, type } = node;
      const fullPath = path.length === 0 ? `${key}` : `${path}.${key}`;

      switch (type) {
        case 'added':
          return [...acc, `Property '${fullPath}' was added with value: ${dataToStr(node.value)}`];
        case 'removed':
          return [...acc, `Property '${fullPath}' was removed`];
        case 'nested':
          return [...acc, ...iter(node.children, fullPath)];
        case 'unchanged':
          return acc;
        case 'changed':
          return [...acc, `Property '${fullPath}' was updated. From ${dataToStr(node.oldValue)} to ${dataToStr(node.newValue)}`];
        default:
          throw new Error(`Unknown type! Type: '${type}', key '${key}'`);
      }
    },
    [],
  );

  return iter(diffObj, '').join('\n');
};

export default plain;
