#!/usr/bin/env node
import https from 'https';

https.get('https://example.com', (response) => {
  let data = '';
  response.on('data', (chunk) => data += chunk);
  response.on('end', () => console.log(data));
}).on('error', (error) => console.error('Error:', error.message));