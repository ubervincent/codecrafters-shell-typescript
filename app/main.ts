import { createInterface } from "node:readline";
import path from 'node:path';
import fs from 'fs'

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
    const files = process.env.PATH?.split(path.delimiter)
    let found = false

    console.log(files)
    for (const filePath of files!) {
      if (path.basename(filePath) == args[0]) {
        try {
          fs.accessSync(filePath, fs.constants.X_OK);
          console.log(`${args[0]} is ${filePath}`)
          found = true
        } catch {
          continue
        }
      } 
    }
    
    if (!found) {
      ["echo", "type", "exit"].includes(args[0]) ? console.log(`${args[0]} is a shell builtin`) : console.log(`${args[0]}: not found`)
    }

  } else {

    console.log(`${line}: command not found`);

  }
  rl.prompt()
});

