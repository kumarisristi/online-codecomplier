const fs = require("fs");

const file = process.argv[2];
if (!file) {
  console.error("Usage: brainfuck.js main.bf");
  process.exit(1);
}

const code = fs.readFileSync(file, "utf8").replace(/[^\[\]<>+.,-]/g, "");
const jump = [];
const stack = [];

for (let i = 0; i < code.length; i++) {
  if (code[i] === "[") stack.push(i);
  if (code[i] === "]") {
    if (!stack.length) {
      console.error("Syntax error: unmatched ]");
      process.exit(1);
    }
    const start = stack.pop();
    jump[start] = i;
    jump[i] = start;
  }
}

if (stack.length) {
  console.error("Syntax error: unmatched [");
  process.exit(1);
}

const memory = new Uint8Array(30000);
let pointer = 0;
let pc = 0;
let input = "";
let inputIndex = 0;

try {
  input = fs.readFileSync(0, "utf8");
} catch {}

while (pc < code.length) {
  switch (code[pc]) {
    case ">":
      if (++pointer >= memory.length) pointer = 0;
      break;
    case "<":
      if (--pointer < 0) pointer = memory.length - 1;
      break;
    case "+":
      memory[pointer] = (memory[pointer] + 1) & 255;
      break;
    case "-":
      memory[pointer] = (memory[pointer] - 1 + 256) & 255;
      break;
    case ".":
      process.stdout.write(String.fromCharCode(memory[pointer]));
      break;
    case ",":
      memory[pointer] = inputIndex < input.length
        ? input.charCodeAt(inputIndex++) & 255
        : 0;
      break;
    case "[":
      if (memory[pointer] === 0) pc = jump[pc];
      break;
    case "]":
      if (memory[pointer] !== 0) pc = jump[pc];
      break;
  }
  pc++;
}
