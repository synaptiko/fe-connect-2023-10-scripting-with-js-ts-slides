#!/usr/bin/env deno run --allow-read
async function* readFiles(dir: string) {
  for await (const file of Deno.readDir(dir)) {
    yield Deno.readTextFile(`${dir}/${file.name}`);
  }
}

for await (const content of readFiles('./testdir')) {
  console.log(content);
}
