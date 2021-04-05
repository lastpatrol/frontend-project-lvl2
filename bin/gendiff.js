#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import printDiff from '../src/index.js';

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
