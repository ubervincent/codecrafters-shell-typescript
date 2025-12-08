import { createInterface } from "node:readline";
import path from 'node:path';
import child_process from 'node:child_process';
import fs from 'fs'
import { promisify } from 'node:util';
import { error } from "node:console";
import { stdout } from "node:process";

const exec = promisify(child_process.exec);


const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.setPrompt("$ ")
rl.prompt()

rl.on('line', async (line: string) => {

  const pathVar = process.env.PATH || "";
  const files = pathVar.split(path.delimiter);

  const [command, ...args] = line.split(" ")

  if (line == "exit") {
    rl.close()
    process.exit(0);
  } else if (command == "echo") {
    const echo = line.split(" ").slice(1)
    console.log(`${echo.join(" ")}`)

  } else if (command == "type") {
   
    let found = false

    if (["echo", "type", "exit"].includes(args[0])) {
      console.log(`${args[0]} is a shell builtin`)
    } else {
      for (const filePath of files!) {
        try {
          const execPath = path.join(filePath, args[0])
          fs.accessSync(execPath, fs.constants.X_OK);
          console.log(`${args[0]} is ${execPath}`)
          found = true
        } catch {
          continue
        }
      }

      if(!found) {
        console.log(`${args[0]}: not found`)
      }
    }
  } else {
    const execPaths = files.map(filePath => path.join(filePath, command))
    let found = false

    for (const execPath of execPaths) {
      try {
        fs.accessSync(execPath, fs.constants.X_OK)
        const { stdout } = await exec(line);
        console.log(stdout);
        found = true
      } catch {
        continue
      }
    }
    
    if (!found) {
      console.log(`${line}: command not found`);
    }
  }
  rl.prompt()
});

