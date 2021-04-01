#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import printDiff from '../src/index.js';

const program = new Command();

program
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .action((filepath1, filepath2) => printDiff(filepath1, filepath2));

program.parse();
