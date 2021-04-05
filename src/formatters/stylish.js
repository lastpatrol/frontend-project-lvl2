import _ from 'lodash';
// import importObj from '../../__fixtures__/diff-obj.js';

const stylish = (diffObj) => {
  // console.log(JSON.stringify(diffObj, null, 2));

  const block = ' ';
  const indentStep = 4;
  const diffLength = 2;
  const diffAdded = '+ ';
  const diffDeleted = '- ';
  const diffSame = '  ';

  const iter = (obj, indentCount) => {
    const indentation = _.repeat(block, indentCount);
    const arr = obj.flatMap(
      ({ diff, key, value }) => {
        let diffStr;
        if (diff > 0) diffStr = diffAdded;
        if (diff < 0) diffStr = diffDeleted;
        if (diff === 0) diffStr = diffSame;

        if (!Array.isArray(value)) {
          return `${indentation}${diffStr}${key}: ${value}`;
        }

        return `${indentation}${diffStr}${key}: ${iter(value, indentCount + indentStep)}`;
      },
    );

    const joined = arr.join('\n');
    console.log(joined);
    const closingBracketIndentation = indentation.slice(0, indentation.length - diffLength);
    return `{\n${joined}\n${closingBracketIndentation}}`;
  };

  return iter(diffObj, 0);
};

// console.log(stylish(importObj));

export default stylish;
