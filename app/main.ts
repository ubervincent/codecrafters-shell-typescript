import { createInterface } from "readline";

const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt("$ ")
rl.prompt()

rl.on('line', (line: string) => {
  const parts = line.split(" ")
  const command = parts[0]

  if (line == "exit") {

    rl.close()

  } else if (command == "echo") {

    const echo = line.split(" ").slice(1)
    console.log(`${echo.join(" ")}`)
    rl.prompt()

  } else if (command == "type") {

    const toCheck = parts.slice(1).join(" ")

    if (toCheck == "exit" || toCheck == "type" || toCheck == "echo") {
      console.log(`${toCheck} is a shell builtin`)
      rl.prompt()
    } else {
      console.log(`${toCheck} not found`)
      rl.prompt()
    }

  } else {

    console.log(`${line}: command not found`);
    rl.prompt()

  }
});

