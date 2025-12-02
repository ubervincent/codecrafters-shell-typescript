import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt("$")
rl.prompt()

rl.on('line', (line: string) => {
  console.log(`${line}: command not found`);
  rl.prompt()
});

