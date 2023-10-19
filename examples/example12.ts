#!/usr/bin/env deno run --allow-net
try {
  const response = await fetch('https://example.com');
  const data = await response.text();
  console.log(data);
} catch (error) {
  console.error('Error:', error.message);
}
