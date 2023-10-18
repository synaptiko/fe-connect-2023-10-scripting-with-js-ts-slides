#!/usr/bin/env node
import { readdir, readFile } from 'fs/promises';
import { join } from 'path';

async function* readFiles(dir) {
  const files = await readdir(dir);
  for (const file of files) {
    yield readFile(join(dir, file), 'utf-8');
  }
}

for await (const content of readFiles('./testdir')) {
  console.log(content);
}
