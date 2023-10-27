---
theme: ./theme
layout: cover
class: text-center
highlighter: monaco
lineNumbers: false
transition: slide-left
title: Scripting with JavaScript/TypeScript (Node.js/Deno/Bun)
background: ./images/intro-alternate.png
mdc: true
hideInToc: true
---

<br>

# <sup style="color:rgba(255,255,255,.33)">Modern?</sup> Scripting with JavaScript/TypeScript
## (Node.js/Deno/Bun)

by Jiri
<br>
<small>(& ChatGPT with DALL-E 3)</small>

---
layout: image-right
image: ./images/toc.png
hideInToc: true
---

# TOC

<Toc columns=1 maxDepth=1 />

---
layout: image-right
image: ./images/nodejs.png
---

# Node.js

- Proven and stable, with a rich ecosystem.
- New versions support ESM, top-level await and .env files natively.
- New permission model inspired by Deno and Bun.
- Not easy to write in TypeScript.

---
layout: image-right
image: ./images/deno.png
---

# Deno

- Created by Node.js' original developer to address its shortcomings.
- Built-in TypeScript support, simplified module system.
- Rapidly gaining traction as a modern alternative to Node.js.
- Supports npm repository (and Node.js' native modules).
- Complete set of tools in a single binary.
- Based on web standards, its env resembles the one in the browser (when possible).
- Has built-in (core) functionality, standard library, third-party repo and NPM & Node.js compatibility layer.

---
layout: image-right
image: ./images/bun.png
---

# Bun

- New, built from scratch for modern JavaScript/TypeScript development.
- Focus on speed, elegant APIs, and a cohesive DX.
- Marketed as a drop-in replacement for Node.js, aiming to run most server-side JavaScript efficiently.
- Complete set of tools in a single binary.
- Has built-in (core) functionality and NPM & Node.js compatibility layer.
- Should run (almost) all stuff from Node.js and npm repository.

---

# Anatomy of scripts in Unix

<br>

## What is #! aka hashbang/shebang?

- Purpose: Specifies the script interpreter
- Syntax: `#!` followed by the path to the interpreter and arguments (optionally)
- Execution: System uses the interpreter to run the script
- Notation: Must be the first line of the file

---

### Example 1: Bash script

```bash
#!/usr/bin/env bash
```
```bash
curl -o example.html https://www.example.com
```

<br>
<br>

### Example 2: Deno script

```bash
#!/usr/bin/env deno run --allow-net
```
```typescript
const res = await fetch("https://www.example.com");
const text = await res.text();
console.log(text);
```

---

### Note on /usr/bin/env

- Portability: `/usr/bin/env` locates the script interpreter from `PATH`
- Compatibility: Better cross-system support

<small>Using `/usr/bin/env bash` ensures that the script will run on systems where `bash` is installed in a different directory.</small>

---
hideInToc: true
---

# Anatomy of scripts in Unix

<br>

## What is chmod +x?

- Relates to: Script execution permissions that control who can run the script.
- Syntax: `chmod +x script-name`
- Result: Command makes a script executable by adding execution permissions.

---

### Example 3: Making script executable

```bash
# Before chmod +x
ls -l script.ts
-rw-r--r-- 1 user group 89 Oct 18 13:26 script.ts

# After chmod +x
chmod +x script.ts
ls -l script.ts
-rwxr-xr-x 1 user group 89 Oct 18 13:26 script.ts
```

<br>

After running `chmod +x`, the script becomes executable and can be run using `./script_name`.

---
hideInToc: true
---

# Anatomy of scripts in Unix

<br>

## What are command args, stdin/stdout/stderr and exit code?

- Command Arguments: Input flags or options for script
- Stdin: Standard input stream
- Stdout: Standard output stream
- Stderr: Standard error stream
- Exit code: Numerical value process returns to the system when finishes execution
- Importance: Data flow and error handling

---

### Example 4: Bash script with arguments and IO streams

```bash
#!/usr/bin/env bash
```
```bash
echo "Argument 1: $1"        # stdout
echo "Argument 2: $2" 1>&2   # stderr
read -p "Enter input: " var  # stdin
echo "You entered: $var"     # stdout
exit 1                       # return 1 as exit code
```

<br>

Run as `./example4.sh arg1 arg2`

---

### Example 5: Deno script with arguments and IO streams

```bash
#!/usr/bin/env deno run --allow-read
```
```typescript
const args = Deno.args; // command arguments

console.log(`Argument 1: ${args[0]}`); // stdout
console.error(`Argument 2: ${args[1]}`); // stderr

Deno.stdout.write(new TextEncoder().encode('Enter input: '));
const buf = new Uint8Array(1024);
const n = <number>await Deno.stdin.read(buf); // stdin
const input = new TextDecoder().decode(buf.subarray(0, n));
console.log(`You entered: ${input.trim()}`); // stdout
Deno.exit(1); // return 1 as exit code
```

<br>

Run as `./example5.ts arg1 arg2`

---

# (Top-level) async/await

1. Why use `async`/`await`: Simplifies asynchronous code, easier to read and maintain.
2. How it works:
    - `async`: Declares a function as asynchronous.
    - `await`: Pauses until promise is resolved.
3. Error handling: Use `try`/`catch`.
4. Top-level `await`: Available in Node.js v14+, Deno, and Bun.
5. Scripting use case: Suitable for one-off tasks, automation, data fetching.

Note: In order to use top-level `await` in Node.js, make sure to use `.mjs` file extension.

---

# Async iteration with for await

- `for await` iterates over `AsyncIterable`s
- Non-blocking code execution
- Ideal for streaming data
- Common in Node.js/Deno/Bun for I/O operations

---

# Accessing filesystem

<br>

## Node.js
- `fs` module, 3 variants:
  - `*Sync` versions functions (ok for simple scripting; problematic to parallelize)
  - callback versions with `fs` (christmas-tree-callback-hell prone)
  - promise-based versions with `fs/promises` (great with `await`)

## Deno & Bun
- compatibility layer for Node.js' `fs` module
- standard functions exposed under `Deno` namespace
- a few optimized functions exposed under `Bun` namespace

---

## Example 6: Node.js without top-level await

```bash
#!/usr/bin/env node
```
```javascript
const { readFile } = require('fs').promises;

async function main() {
  const data = await readFile('example.txt', 'utf-8');
  console.log(data);
}

main();
```

<br>

## Example 7: Node.js with top-level await

```bash
#!/usr/bin/env node
```
```javascript
import { readFile } from 'fs/promises';

const data = await readFile('example.txt', 'utf-8');
console.log(data);
```
---

## Example 8: Node.js with async iteration

```bash
#!/usr/bin/env node
```
```javascript
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
```

---

## Example 9: Deno with async iteration

```bash
#!/usr/bin/env deno run --allow-read
```
```typescript
async function* readFiles(dir: string) {
  for await (const file of Deno.readDir(dir)) {
    yield Deno.readTextFile(`${dir}/${file.name}`);
  }
}

for await (const content of readFiles('./testdir')) {
  console.log(content);
}
```

---

## Example 10: Bun with async iteration

```bash
#!/usr/bin/env bun
```
```typescript
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
```

---

# Data fetching

<br>

## Node.js
- by default you have to use built-in `http`/`https` module; it's very low-level
- you can use libs like `axios`, `got` or `whatwg-fetch` for high-level access

## Deno & Bun
- both have browser-compatible `fetch` available; no need for additional libs

## Tip
- if you need to scrape a webpage, you can use `cheerio` from npm
  - it has jQuery-like API and it's very easy to get specific info you need with it

---

## Example 11: Node.js

```bash
#!/usr/bin/env node
```
```javascript
import https from 'https';

https.get('https://example.com', (response) => {
  let data = '';
  response.on('data', (chunk) => data += chunk);
  response.on('end', () => console.log(data));
}).on('error', (error) => console.error('Error:', error.message));
```

---

## Example 12 & 13: Deno & Bun

```bash
#!/usr/bin/env deno run --allow-net
```
or
```bash
#!/usr/bin/env bun
```
```typescript
try {
  const response = await fetch('https://example.com');
  const data = await response.text();
  console.log(data);
} catch (error) {
  console.error('Error:', error.message);
}
```

---

## Example 14: Web scrapping with cheerio

```bash
#!/usr/bin/env deno run --allow-net
```
```typescript
import * as cheerio from 'https://esm.sh/cheerio';

try {
  const response = await fetch('https://example.com');
  const data = await response.text();
  const $ = cheerio.load(data);
  console.log($("body > div > p > a").attr('href'));
} catch (error) {
  console.error('Error:', error.message);
}
```

---

# Child processes

<br>

## Node.js

- built-in `child_process` module

## Deno

- built-in `Deno.Command` class

## Bun

- built-in `Bun.spawn` function

---

## Example 15: Node.js

```bash
#!/usr/bin/env node
```
```javascript
import { promisify } from 'util';
import { exec as _exec } from 'child_process';

const exec = promisify(_exec);
const { stdout } = await exec('git rev-parse HEAD');

console.log('Output:', stdout.trim());
```

---

## Example 16: Deno

```bash
#!/usr/bin/env deno run --allow-run
```
```typescript
const command = new Deno.Command('git', { args: ['rev-parse', 'HEAD'] });
const { stdout } = await command.output();

console.log('Output:', new TextDecoder().decode(stdout).trim());
```

---

## Example 17: Bun

```bash
#!/usr/bin/env bun
```
```typescript
const proc = Bun.spawn(['git', 'rev-parse', 'HEAD']);

console.log('Output:', (await new Response(proc.stdout).text()).trim());
```

---

# Output & colors

<br>

## Node.js & Bun

- `chalk` or other npm module which wraps ANSI sequences

## Deno

- `fmt/colors` from its standard library

---

## Example 18 & 19: Node.js & Bun

```bash
#!/usr/bin/env node
```
or
```bash
#!/usr/bin/env bun
```
```javascript
import chalk from 'chalk';

const { bgBlue, red, bold } = chalk;

console.log(bgBlue(red(bold("Red on blue? 🤢"))));
```

---

## Example 20: Deno

```bash
#!/usr/bin/env deno run
```
```typescript
import { bgBlue, red, bold } from "https://deno.land/std/fmt/colors.ts";

console.log(bgBlue(red(bold("Red on blue? 🤢"))));
```

---

# Prompts & user input

<br>

## Node.js & Bun

- `inquirer` npm module

## Deno

- `cliffy` third-party module

---

## Example 21 & 22: Node.js & Bun

```bash
#!/usr/bin/env node
```
or
```bash
#!/usr/bin/env bun
```
```javascript
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
```

---

## Example 23: Deno

```bash
#!/usr/bin/env deno run
```
```typescript
import { Input } from 'https://deno.land/x/cliffy@v1.0.0-rc.3/prompt/mod.ts';

let name: string;

name = await Input.prompt({
  message: 'Enter your name',
  default: 'John Doe',
});

console.log('Name:', name);
```

---

# Script -> Tool

<br>

- Problem: To run a script, one needs to be in the folder with it or use relative/absolute path.
- Solutions:
  1. (My favorite) Create `~/.bin` or `~/local/.bin` and add it to your `PATH` env variable; place all the scripts you want available globally there
  2. Move them to `/usr/bin` which is usually in `PATH` by default
  3. Use `deno install ...`

<br>

Tip: `Deno` and `Bun` also provide `bundle` and `compile` (for `Deno`) or `build` (for `Bun`) to create a single script/binary you can then use or distribute (this allows you to have the script in single file, together with deps & interpreter itself).

---
layout: statement
---

### Runnable examples can be found under [`/examples` folder](https://github.com/synaptiko/fe-connect-2023-10-scripting-with-js-ts-slides/tree/master/examples).

---
layout: statement
---

# Reverse Q&A

### 1. What's hashbang?

<br>

### 2. Why is top-level await useful?

<br>

### 4. What libraries can be used for prompts?

<br>

### 3. How to fetch data in Node.js, Deno and Bun?

<br>

### 5. What will be the first script you'll create with your newfound knowledge?

---
layout: cover
background: ./images/thank-you.png
dim: false
---