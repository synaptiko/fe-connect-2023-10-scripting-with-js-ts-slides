#!/usr/bin/env deno run --allow-net
const res = await fetch("https://www.example.com");
const text = await res.text();
console.log(text);