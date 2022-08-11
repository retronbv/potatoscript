#!/usr/bin/env node
const bf = require("brainfudge");
const args = process.argv;
args.shift(); args.shift(); // remove binary path and current directory
const fs = require("fs");

// Potato Script
// Brainf*** but with potatoes
// [  ]     <      >        +          -             .              ,
// 🥔 🥔🥔 🥔🥔🥔 🥔🥔🥔🥔 🥔🥔🥔🥔🥔 🥔🥔🥔🥔🥔🥔 🥔🥔🥔🥔🥔🥔🥔 🥔🥔🥔🥔🥔🥔🥔🥔
// confusing right?

function convert(code) {
  return code.replaceAll("🥔🥔🥔🥔🥔🥔🥔🥔", ",")
    .replaceAll("🥔🥔🥔🥔🥔🥔🥔", ".")
    .replaceAll("🥔🥔🥔🥔🥔🥔", "-")
    .replaceAll("🥔🥔🥔🥔🥔", "+")
    .replaceAll("🥔🥔🥔🥔", ">")
    .replaceAll("🥔🥔🥔", "<")
    .replaceAll("🥔🥔", "]")
    .replaceAll("🥔", "[");
}

function run(code) {
  output = "";
  bf.exec(code, (e, o) => {
    if (e) { throw e; }
    output = o;
  });
  return output;
}

if (args.length === 0) {
  console.log("Please provide a file to run");
  process.exit(0);
}

if (args[0] === ".") args[0] = "index.ps";
rawcode = fs.readFileSync("./" + args[0], { encoding: 'utf8', flag: 'r' });
console.log(run(convert(rawcode)));