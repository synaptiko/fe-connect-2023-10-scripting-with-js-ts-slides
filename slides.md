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
---

<br>

# Scripting with JavaScript/TypeScript
## (Node.js/Deno/Bun)

by Jiri
<br>
<small>(& ChatGPT with DALL-E 3)</small>

---

# Node.js

- Proven and stable, with a rich ecosystem (npm repository).
- Now also supports ESM, top-level await and .env files natively.
- Introduced a new permission model inspired by Deno and Bun.
- It's not easy to write scripts in TypeScript for it.

---

# Deno

- Created by Node.js's original developer to address its shortcomings.
- Built-in TypeScript support, simplified module system.
- Rapidly gaining traction as a modern alternative to Node.js.
- Now supports also npm repository (and many of Node.js's native modules).
- Based on web standards, its env resembles the one in the browser (when possible).

---

# Bun

- New, built from scratch for modern JavaScript development.
- Focus on speed, elegant APIs, and a cohesive DX.
- Marketed as a drop-in replacement for Node.js, aiming to run most server-side JavaScript efficiently.
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

# Anatomy of scripts in Unix

<br>

## What are command args and stdin/stdout/stderr?

- Command Arguments: Input flags or options for script
- Stdin: Standard input stream
- Stdout: Standard output stream
- Stderr: Standard error stream
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

const buf = new Uint8Array(1024);
const n = <number>await Deno.stdin.read(buf); // stdin
const input = new TextDecoder().decode(buf.subarray(0, n));
console.log(`You entered: ${input.trim()}`); // stdout
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

## Node.js
- `fs` module
- 3 variants:
  - `*Sync` versions functions (ok for simple scripting; problematic to parallelize)
  - callback versions with `fs` (christmas-tree-callback-hell prone)
  - promise-based versions with `fs/promises` (great with `await`)

## Deno
- standard functions exposed under `Deno` namespace
- compatibility layer for Node.js' `fs` module

## Bun
- a few optimized functions exposed under `Bun` namespace
- compatibility layer for Node.js' `fs` module

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
#!/usr/bin/env -S deno run --allow-read
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

### Example 10: Bun with async iteration

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

```bash
```
```javascript
const https = require('https');

https.get('https://example.com', (response) => {
  let data = '';
  response.on('data', (chunk) => data += chunk);
  response.on('end', () => console.log(data));
}).on('error', (error) => console.error('Error:', error.message));
```

Identical for bun & deno!

```bash
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
layout: statement
---

Runnable examples can be found in the repository with slides under `/examples` folder.

---
layout: cover
background: ./images/thank-you.png
dim: false
---

---

Notes:
- Explain difference between Node.js/Deno/Bun
- Explain scripting & hashbang (shebang)
- stdin/stdout/stderr
- Async/await (top-level too)
- for await loops for streaming
- working with FS: describe a few differences between envs (and optimizitions done in Bun)

- fetching data (Node.js vs `fetch` in Deno/Bun)
- mention about `cheerio`

- child processes
- output & colors (chai in Node.js vs Deno)
- prompts & input
- exposing ports