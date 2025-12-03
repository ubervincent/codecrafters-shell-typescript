import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt("$ ")
rl.prompt()

rl.on('line', (line: string) => {
  const [command, ...args] = line.split(" ")

  if (line == "exit") {
    rl.close()
    process.exit(0);
  } else if (command == "echo") {
    const echo = line.split(" ").slice(1)
    console.log(`${echo.join(" ")}`)

  } else if (command == "type") {
    ["echo", "type", "exit"].includes(args[0]) ? console.log(`${args[0]} is a shell builtin`) : console.log(`${args[0]}: not found`)

  } else {
    console.log(`${line}: command not found`);

  }
  rl.prompt()
});

