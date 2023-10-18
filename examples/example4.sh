#!/usr/bin/env bash
echo "Argument 1: $1"        # stdout
echo "Argument 2: $2" 1>&2   # stderr
read -p "Enter input: " var  # stdin
echo "You entered: $var"     # stdout
