#!/usr/bin/env node

import { Command } from 'commander/esm.mjs';
import path from 'path';
import getDiff from '../src/index.js';

const program = new Command();

program
  .version('1.0.0')
  .arguments('<filepath1> <filepath2>')
  .description('Compares two configuration files and shows a difference.')
  .option('-f, --format <type>', 'output format')
  .action(
    (filepath1, filepath2) => {
      const cwd = process.cwd();
      console.log(getDiff(path.resolve(cwd, filepath1), path.resolve(cwd, filepath2)));
    },
  );

program.parse();
