#!/usr/bin/env node
import inquirer from 'inquirer';

inquirer
  .prompt([{
    type: 'input',
    name: 'name',
    message: 'Enter your name',
    default: 'John Doe',
  }])
  .then((answers) => {
    console.log('Name:', answers.name);
  });