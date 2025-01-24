import { exec } from 'child_process';
import { promisify } from 'util';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const execAsync = promisify(exec);

async function runCombineFiles() {
  try {
    const scriptPath = join(__dirname, 'scripts', 'combine-files.js');
    console.log(`Running ${scriptPath}...`);
    const { stdout, stderr } = await execAsync(`node ${scriptPath}`);
    
    if (stderr) {
      console.error('Error:', stderr);
    } else {
      console.log(stdout);
    }
    
    console.log('\nChecking if full_codebase.txt was created...');
    const fullCodebasePath = join(__dirname, 'full_codebase.txt');
    const { stdout: lsOutput } = await execAsync(`ls -l "${fullCodebasePath}"`);
    console.log(lsOutput);
    
  } catch (error) {
    console.error('Error running script:', error.message);
  }
}

runCombineFiles();