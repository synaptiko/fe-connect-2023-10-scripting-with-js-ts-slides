#!/usr/bin/env node
const { readFile } = require('fs').promises;

async function main() {
  const data = await readFile('example.txt', 'utf-8');
  console.log(data);
}

main();