import { spawn } from 'child_process';
import {exec} from 'child_process';
import { writeFile, unlink, access, constants } from 'fs/promises';
import { platform } from 'os';

export default async function cppcompiler(code: string, input: string): Promise<string> {
  const fileName = 'temp.cpp';
  const inputFileName = 'input.txt';
  const outputFile = platform() === 'win32' ? 'output.exe' : 'output';

  try {
    // Write C++ code to a temporary file
    await writeFile(fileName, code);

    // Write input data to a temporary file
    await writeFile(inputFileName, input);

    // Verify the file existence
    await access(fileName, constants.F_OK);

    // Compile the C++ code
    await new Promise<void>((resolve, reject) => {
      exec(`g++ ${fileName} -o ${outputFile}`, (error, stdout, stderr) => {
        if (stderr) reject(stderr);
        else resolve();
        //console.log(stderr);
      });
    });

    // Execute the compiled program with a timeout
    const startTime = performance.now();
    const result = await new Promise<string>((resolve, reject) => {
      // Configure the pipes for stdin, stdout, and stderr
      const child = spawn(`./${outputFile}`, { 
        stdio: ['pipe', 'pipe', 'pipe'] // Pipe configuration
      });

      let output = '';
      let errorOutput = '';

      // Writing input to the child process's stdin
      child.stdin.write(input);
      child.stdin.end();

      // Capture stdout data from the child process
      child.stdout.on('data', (data) => {
        output += data.toString();
      });

      // Capture stderr data from the child process
      child.stderr.on('data', (data) => {
        errorOutput += data.toString();
      });
      const endTime = performance.now();
        let runtime = endTime - startTime;
        const run_time = runtime.toFixed(2);

      // Handle the process timeout (5 seconds)
      const timeout = setTimeout(() => {
        child.kill('SIGKILL');
        reject("Execution terminated: Process exceeded 5 seconds");
      }, 5000);

      // Handle process close event
      child.on('close', (code) => {
        clearTimeout(timeout);
        if (code === 0) {
          if (errorOutput) {
            reject(errorOutput);
          } else {
            resolve(output+" "+run_time);
          }
        } else {
          reject(`SEGFAULT`);
        }
      });
    });

    return result;

  } catch (err) {
    throw err;

  } finally {
    // Clean up temporary files
    try {
      await unlink(fileName).catch(() => {});
      await unlink(inputFileName).catch(() => {});
      await unlink(outputFile).catch(() => {});
    } catch (cleanupError) {
      console.error('Error cleaning up files:', cleanupError);
    }
  }
}
