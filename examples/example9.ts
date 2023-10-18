#!/usr/bin/env -S deno run --allow-read
async function* readFiles(dir: string) {
  for await (const dirEntry of Deno.readDir(dir)) {
    const filePath = `${dir}/${dirEntry.name}`;

    yield Deno.readTextFile(filePath);
  }
}

for await (const content of readFiles('./testdir')) {
  console.log(content);
}