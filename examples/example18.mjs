#!/usr/bin/env node
import chalk from 'chalk';

const { bgBlue, red, bold } = chalk;

console.log(bgBlue(red(bold("Red on blue? 🤢"))));