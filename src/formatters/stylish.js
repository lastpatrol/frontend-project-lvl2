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
        if (node.type === 'toNested') {
          const value = _.has(node, 'value') ? `${indentation}${getDiffStr('-')}${node.key}: ${node.value}` : [];
          const nested = `${indentation}${getDiffStr('+')}${node.key}: ${iter(node.children, indentCount + indentStep)}`;
          return [...acc, value, nested];
        }

        if (node.type === 'toSimple') {
          const nested = _.has(node, 'children')
            ? `${indentation}${getDiffStr('-')}${node.key}: ${iter(node.children, indentCount + indentStep)}` : [];
          const value = `${indentation}${getDiffStr('+')}${node.key}: ${node.value}`;
          return [...acc, nested, value];
        }

        if (node.type === 'removed') {
          const value = _.has(node, 'value') ? `${indentation}${getDiffStr('-')}${node.key}: ${node.value}` : [];
          const nested = _.has(node, 'children')
            ? `${indentation}${getDiffStr('-')}${node.key}: ${iter(node.children, indentCount + indentStep)}` : [];
          return [...acc, value, nested];
        }

        if (node.type === 'unchanged') {
          const value = _.has(node, 'value') ? `${indentation}${getDiffStr()}${node.key}: ${node.value}` : [];
          const nested = _.has(node, 'children')
            ? `${indentation}${getDiffStr()}${node.key}: ${iter(node.children, indentCount + indentStep)}` : [];
          return [...acc, value, nested];
        }

        if (node.type === 'changedSimple') {
          const removed = `${indentation}${getDiffStr('-')}${node.key}: ${node.removedValue}`;
          const added = `${indentation}${getDiffStr('+')}${node.key}: ${node.addedValue}`;
          return [...acc, removed, added];
        }
        throw new Error(`Unknown node type '${node.type}'`);
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
