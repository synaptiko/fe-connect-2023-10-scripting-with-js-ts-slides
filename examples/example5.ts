#!/usr/bin/env deno run --allow-read
const args = Deno.args; // command arguments

console.log(`Argument 1: ${args[0]}`); // stdout
console.error(`Argument 2: ${args[1]}`); // stderr

Deno.stdout.write(new TextEncoder().encode('Enter input: '));
const buf = new Uint8Array(1024);
const n = <number>await Deno.stdin.read(buf); // stdin
const input = new TextDecoder().decode(buf.subarray(0, n));
console.log(`You entered: ${input.trim()}`); // stdout
Deno.exit(1); // return 1 as exit code