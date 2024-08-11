import { spawn } from 'child_process';
import { writeFile, unlink, access, constants } from 'fs/promises';

export default async function pythonCompiler(code: string, input: string): Promise<string> {
  const fileName = 'temp.py';
  const inputFileName = 'input.txt';
  const pythonCmd = process.platform === 'win32' ? 'python' : 'python3';

  try {
    // Write Python code to a temporary file
    await writeFile(fileName, code);

    // Write input data to a temporary file
    await writeFile(inputFileName, input);

    // Verify the file existence
    await access(fileName, constants.F_OK);

    // Execute the Python script with a timeout
    const startTime = performance.now();
    const result = await new Promise<string>((resolve, reject) => {
      // Configure the pipes for stdin, stdout, and stderr
      const child = spawn(pythonCmd, [fileName], {
        stdio: ['pipe', 'pipe', 'pipe'], // Pipe configuration
        shell: true // Use shell for better compatibility
      });

      let output = '';
      let errorOutput = '';

      // Writing input to the child process's stdin
      child.stdin.write(input);
      child.stdin.end();
      console.log(code);console.log(input);

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
            resolve(output + " " + run_time);
          }
        } else {
          reject(`Process exited with code ${code}`);
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
    } catch (cleanupError) {
      console.error('Error cleaning up files:', cleanupError);
    }
  }
}
