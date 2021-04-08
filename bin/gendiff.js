#!/usr/bin/env node

import commander from 'commander';
import printDiff from '../src/index.js';

const { Command } = commander;
const program = new Command();

program
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action(
    (filepath1, filepath2, options) => console.log(printDiff(filepath1, filepath2, options.format)),
  );

program.parse();
