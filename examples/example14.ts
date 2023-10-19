#!/usr/bin/env deno run --allow-net
import * as cheerio from 'https://esm.sh/cheerio';

try {
  const response = await fetch('https://example.com');
  const data = await response.text();
  const $ = cheerio.load(data);
  console.log($("body > div > p > a").attr('href'));
} catch (error) {
  console.error('Error:', error.message);
}