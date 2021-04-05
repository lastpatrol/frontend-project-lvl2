import _ from 'lodash';

const stylish = (diffObj) => {
  const block = ' ';
  const indentStep = 4;
  const diffLength = 2;
  const diffStrings = {
    1: '+ ',
    [-1]: '- ',
    0: '  ',
  };

  const iter = (obj, indentCount) => {
    const indentation = _.repeat(block, indentCount);
    const arr = obj.flatMap(
      ({ diff, key, value }) => {
        const diffStr = diffStrings[diff];
        if (!Array.isArray(value)) {
          return `${indentation}${diffStr}${key}: ${value}`;
        }

        return `${indentation}${diffStr}${key}: ${iter(value, indentCount + indentStep)}`;
      },
    );

    const joined = arr.join('\n');
    const closingBracketIndentation = indentation.slice(0, indentation.length - diffLength);
    return `{\n${joined}\n${closingBracketIndentation}}`;
  };

  return iter(diffObj, 2);
};

export default stylish;
