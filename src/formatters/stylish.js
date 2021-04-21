import _ from 'lodash';

const block = ' ';
const indentStep = 4;
const diffLength = 2;
const getDiffStr = (key) => {
  if (key === '+') return '+ ';
  if (key === '-') return '- ';
  return '  ';
};

const valueToString = (val, indentCount) => {
  if (!_.isPlainObject(val)) {
    return `${val}`;
  }

  const indentation = _.repeat(block, indentCount);
  const entries = Object.entries(val);
  const arrOfStrings = entries.map(([key, value]) => {
    const valuePart = _.isPlainObject(value)
      ? valueToString(value, indentCount + indentStep) : value;
    return `${indentation}${key}: ${valuePart}`;
  });
  const closingBracketIndentation = _.repeat(block, indentCount - indentStep);
  return `{\n${arrOfStrings.join('\n')}\n${closingBracketIndentation}}`;
};

const stylish = (diffObj) => {
  const iter = (obj, indentCount) => {
    const indentation = _.repeat(block, indentCount);
    const arrOfStrings = obj.reduce(
      (acc, node) => {
        const { type, key } = node;
        const makeStr = (sign, value) => `${indentation}${getDiffStr(sign)}${key}: ${valueToString(value, indentCount + indentStep + diffLength)}`;

        switch (type) {
          case 'added':
            return [...acc, makeStr('+', node.value)];
          case 'removed':
            return [...acc, makeStr('-', node.value)];
          case 'nested':
            return [
              ...acc,
              `${indentation}${getDiffStr()}${key}: ${iter(node.children, indentCount + indentStep)}`,
            ];
          case 'changed':
            return [...acc, makeStr('-', node.oldValue), makeStr('+', node.newValue)];
          case 'unchanged':
            return [...acc, makeStr('', node.value)];
          default:
            throw new Error(`Unknown node type '${type}'`);
        }
      },
      [],
    );

    const joined = arrOfStrings.flat().join('\n');
    const closingBracketIndentation = indentation.slice(0, indentation.length - diffLength);
    return `{\n${joined}\n${closingBracketIndentation}}`;
  };

  return iter(diffObj, 2);
};

export default stylish;
