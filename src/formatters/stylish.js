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

        switch (type) {
          case 'added':
            return [
              ...acc,
              `${indentation}${getDiffStr('+')}${key}: ${valueToString(node.value, indentCount + indentStep + diffLength)}`,
            ];
          case 'removed':
            return [
              ...acc,
              `${indentation}${getDiffStr('-')}${key}: ${valueToString(node.value, indentCount + indentStep + diffLength)}`,
            ];
          case 'nested':
            return [
              ...acc,
              `${indentation}${getDiffStr()}${key}: ${iter(node.children, indentCount + indentStep)}`,
            ];
          case 'changed':
            return [
              ...acc,
              `${indentation}${getDiffStr('-')}${key}: ${valueToString(node.oldValue, indentCount + indentStep + diffLength)}`,
              `${indentation}${getDiffStr('+')}${key}: ${valueToString(node.newValue, indentCount + indentStep + diffLength)}`,
            ];
          case 'unchanged':
            return [
              ...acc,
              `${indentation}${getDiffStr()}${key}: ${valueToString(node.value, indentCount + indentStep + diffLength)}`,
            ];
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
