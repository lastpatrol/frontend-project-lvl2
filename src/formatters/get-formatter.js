import stylish from './stylish.js';
import lazy from './lazy.js';
import plain from './plain.js';
import json from './json.js';

export default (format) => {
  const formatters = {
    stylish, lazy, plain, json,
  };

  const formatter = formatters[format];
  if (formatter === undefined) {
    throw new Error(`Unknown format '${format}'!`);
  }
  return formatter;
};
