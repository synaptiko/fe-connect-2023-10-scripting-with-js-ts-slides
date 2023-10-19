#!/usr/bin/env deno run --allow-run
const command = new Deno.Command('git', { args: ['rev-parse', 'HEAD'] });
const { stdout } = await command.output();

console.log('Output:', new TextDecoder().decode(stdout).trim());