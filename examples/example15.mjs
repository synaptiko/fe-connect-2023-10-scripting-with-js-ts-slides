#!/usr/bin/env node
import { promisify } from 'util';
import { exec as _exec } from 'child_process';

const exec = promisify(_exec);
const { stdout } = await exec('git rev-parse HEAD');

console.log('Output:', stdout.trim());
