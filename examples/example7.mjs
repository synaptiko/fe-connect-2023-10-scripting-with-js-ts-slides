#!/usr/bin/env node
import { readFile } from 'fs/promises';

const data = await readFile('example.txt', 'utf-8');
console.log(data);