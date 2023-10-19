#!/usr/bin/env bun
import { readdir } from 'node:fs/promises';

async function* readFiles(dir: string) {
  const files = await readdir(dir);

  for (const file of files) {
    yield Bun.file(`${dir}/${file}`).text();
  }
}

for await (const content of readFiles('./testdir')) {
  console.log(content);
}
