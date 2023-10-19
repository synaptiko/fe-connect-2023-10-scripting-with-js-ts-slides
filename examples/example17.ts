#!/usr/bin/env bun
const proc = Bun.spawn(['git', 'rev-parse', 'HEAD']);

console.log('Output:', (await new Response(proc.stdout).text()).trim());
