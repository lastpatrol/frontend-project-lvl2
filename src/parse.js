import { readFileSync } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parse = (filePath) => {
  const data = readFileSync(filePath, 'utf-8');
  const extension = path.extname(filePath);

  if (extension === '.json') {
    return JSON.parse(data);
  }
  if (extension === '.yml' || extension === '.yaml') {
    return yaml.load(data);
  }

  throw new Error('File extension is not supported!');
};

export default parse;
