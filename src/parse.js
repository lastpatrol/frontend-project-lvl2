import yaml from 'js-yaml';
import { readFileSync } from 'fs';
import path from 'path';

const parse = (filepath) => {
  const cwd = process.cwd();
  const fullPath = path.resolve(cwd, filepath);
  const data = readFileSync(fullPath, 'utf-8');
  const type = path.extname(filepath).slice(1);

  switch (type) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error('Invalid data type, cannot parse!');
  }
};

export default parse;
