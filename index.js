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

function reconvert(code) {
  return code.replaceAll(",","🥔🥔🥔🥔🥔🥔🥔🥔 ")
    .replaceAll(".","🥔🥔🥔🥔🥔🥔🥔 ")
    .replaceAll("-","🥔🥔🥔🥔🥔🥔 ")
    .replaceAll("+","🥔🥔🥔🥔🥔 ")
    .replaceAll(">","🥔🥔🥔🥔 ")
    .replaceAll("<","🥔🥔🥔 ")
    .replaceAll("]","🥔🥔 ")
    .replaceAll("[","🥔 ")
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
  console.log("Please provide arguments");
  process.exit(0);
}

if (args[0] === "run") {
  if (args.length === 2) {
    // run potatoscript file
    if (args[1] === ".") args[1] = "index.ps";
    rawcode = fs.readFileSync("./" + args[1], { encoding: 'utf8', flag: 'r' });
    console.log(run(convert(rawcode)));
  } else {
    console.log("Please provide a file to run")
    process.exit(0)
  }
} else if (args[0] === "convert") {
  // convert brainf*** to potatoscript
  switch (args.length) {
    case 1:
      console.log("Please provide a file to convert and a filename to export to");
      process.exit(0);
      break;
    case 2:
      console.log("Please provide a filename to export to");
      process.exit(0);
      break;
    case 3:
      break;
  }
  let converted = reconvert(fs.readFileSync("./" + args[1], { encoding: 'utf8', flag: 'r' }));
  fs.writeFile("./"+args[2],converted,(err,data)=>{
    if (err) console.log(err)
    console.log("Converted  "+args[1]+" to potatoscript");
    process.exit(0)
  });
} else if (args[0] === "deconvert") {
  // convert potatoscript to brainf***
  switch (args.length) {
    case 1:
      console.log("Please provide a file to convert and a filename to export to");
      process.exit(0);
      break;
    case 2:
      console.log("Please provide a filename to export to");
      process.exit(0);
      break;
    case 3:
      break;
  }
  let converted = convert(fs.readFileSync("./" + args[1], { encoding: 'utf8', flag: 'r' }));
  fs.writeFile("./"+args[2],converted,(err,data)=>{
    if (err) console.log(err)
    console.log("Converted  "+args[1]+" to brainf***");
    process.exit(0)
  });
}
