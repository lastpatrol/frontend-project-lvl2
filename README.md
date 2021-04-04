[![Actions Status](https://github.com/lastpatrol/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/lastpatrol/frontend-project-lvl2/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/59bb09aaa14658c67c32/maintainability)](https://codeclimate.com/github/lastpatrol/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/59bb09aaa14658c67c32/test_coverage)](https://codeclimate.com/github/lastpatrol/frontend-project-lvl2/test_coverage)

---

# Difference calculator

## About
This cli-application shows a difference between two specified data-structures in various formats. It has modular architecture and can be easily expanded with new parsers and formatters. For now it works with `.json` and `.yaml` (`.yml`) files.

## Installing as cli-application
    git clone git@github.com:lastpatrol/frontend-project-lvl2.git
    npm install
    npm link

## Usage
    gendiff [options] <filepath1> <filepath2>

Options:

- output format (default: "stylish")

    `-f, --format [type]`

## Installing as js-module
It is not available as an npm-package as of yet. But potentially it could be used as a module without any refactoring. The main function, which takes two objects and builds the difference object, is located in `gendiff.js`.

## Demo

### Default 'Stylish' formatter (flat and nested structures)
[![asciicast](https://asciinema.org/a/LLXKD8S7tAaFjFos7FlCBpTIN.svg)](https://asciinema.org/a/LLXKD8S7tAaFjFos7FlCBpTIN)
[![asciicast](https://asciinema.org/a/PfvAmFnK3XuLcJ2iXv3FZ34Ui.svg)](https://asciinema.org/a/PfvAmFnK3XuLcJ2iXv3FZ34Ui)

### 'Plain' formatter
[![asciicast](https://asciinema.org/a/f1C7bwIxDonzEHmRkL8Gf2LA9.svg)](https://asciinema.org/a/f1C7bwIxDonzEHmRkL8Gf2LA9)

### 'JSON' formatter
[![asciicast](https://asciinema.org/a/q9BHZM9iw8lrTYuF8NL19k0pP.svg)](https://asciinema.org/a/q9BHZM9iw8lrTYuF8NL19k0pP)

### 'Lazy' formatter
[![asciicast](https://asciinema.org/a/k2n1bsaudjVF7QxuVtoBZOu91.svg)](https://asciinema.org/a/k2n1bsaudjVF7QxuVtoBZOu91)
