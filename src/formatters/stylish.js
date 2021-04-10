import _ from 'lodash';

const stylish = (diffObj) => {
  const block = ' ';
  const indentStep = 4;
  const diffLength = 2;
  const getDiffStr = (key) => {
    if (key === '+') return '+ ';
    if (key === '-') return '- ';
    return '  ';
  };

  const iter = (obj, indentCount) => {
    const indentation = _.repeat(block, indentCount);
    const arrOfStrings = obj.reduce(
      (acc, node) => {
        const { type, key } = node;
        const makeSimpleStr = (sign, value = node.value) => `${indentation}${getDiffStr(sign)}${key}: ${value}`;
        const makeNestedStr = (sign) => `${indentation}${getDiffStr(sign)}${key}: ${iter(node.children, indentCount + indentStep)}`;

        switch (type) {
          case 'added':
            return [
              ...acc,
              _.has(node, 'value') ? makeSimpleStr('+') : makeNestedStr('+'),
            ];
          case 'removed':
            return [
              ...acc,
              _.has(node, 'value') ? makeSimpleStr('-') : makeNestedStr('-'),
            ];
          case 'unchanged':
            return [
              ...acc,
              _.has(node, 'value') ? makeSimpleStr('') : makeNestedStr(''),
            ];
          case 'toSimple':
            return [
              ...acc,
              _.has(node, 'children') ? makeNestedStr('-') : makeSimpleStr('-', node.removedValue),
              _.has(node, 'value') ? makeSimpleStr('+') : makeSimpleStr('+', node.addedValue),
            ];
          case 'toNested':
            return [...acc, makeSimpleStr('-'), makeNestedStr('+')];
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
