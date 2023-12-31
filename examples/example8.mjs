#!/usr/bin/env node
import { readdir, readFile } from 'fs/promises';

async function* readFiles(dir) {
  const files = await readdir(dir);

  for (const file of files) {
    yield readFile(`${dir}/${file}`, 'utf-8');
  }
}

for await (const content of readFiles('./testdir')) {
  console.log(content);
}
