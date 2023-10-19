#!/usr/bin/env deno run
import { Input } from 'https://deno.land/x/cliffy@v1.0.0-rc.3/prompt/mod.ts';

let name: string;

name = await Input.prompt({
  message: 'Enter your name',
  default: 'John Doe',
});

console.log('Name:', name);