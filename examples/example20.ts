#!/usr/bin/env deno run
import { bgBlue, red, bold } from "https://deno.land/std/fmt/colors.ts";

console.log(bgBlue(red(bold("Red on blue? 🤢"))));